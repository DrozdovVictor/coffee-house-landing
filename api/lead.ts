import type { VercelRequest, VercelResponse } from "@vercel/node"
import { initializeApp, cert, type App } from "firebase-admin/app"
import {
  getFirestore,
  type Firestore,
  Timestamp,
  FieldValue,
} from "firebase-admin/firestore"
import { normalizeBelarusPhone } from "../src/utilities/checkPhone"

// ==========================================
// 1. ВСТРОЕННЫЙ КОД ИЗ server/firebase.ts
// ==========================================
const globalRef = globalThis as unknown as { kvartaFirebaseApp?: App }

function getDb(): Firestore {
  if (!globalRef.kvartaFirebaseApp) {
    const projectId = process.env.FIREBASE_PROJECT_ID
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")

    if (!projectId || !clientEmail || !privateKey) {
      throw new Error("[firebase] Отсутствуют переменные окружения")
    }

    globalRef.kvartaFirebaseApp = initializeApp(
      { credential: cert({ projectId, clientEmail, privateKey }) },
      "kvarta",
    )
  }
  return getFirestore(globalRef.kvartaFirebaseApp)
}

// ==========================================
// 2. ВСТРОЕННЫЙ КОД ИЗ server/telegram.ts
// ==========================================
const INTEREST_LABELS: Record<string, string> = {
  subscription: "Подписка",
  order: "Разовый заказ",
  question: "Вопрос",
}

interface TelegramLead {
  name: string
  phone: string
  interest: string
  comment: string
  utm: Record<string, string>
  sourcePage: string
}

async function notifyTelegram(lead: TelegramLead): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return

  const utmLines = Object.entries(lead.utm)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n")

  const text = [
    "☕ Новая заявка — Кварта",
    `Имя: ${lead.name}`,
    `Телефон: ${lead.phone}`,
    `Интересует: ${INTEREST_LABELS[lead.interest] ?? lead.interest}`,
    lead.comment ? `Комментарий: ${lead.comment}` : "",
    `Страница: ${lead.sourcePage}`,
    utmLines ? `Реклама:\n${utmLines}` : "",
  ]
    .filter(Boolean)
    .join("\n")

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 2000)

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: text.slice(0, 4000),
      }),
      signal: controller.signal,
    })
  } catch (err) {
    console.error("[telegram] notify failed:", err)
  } finally {
    clearTimeout(timer)
  }
}

// ==========================================
// 3. ОСНОВНОЙ ОБРАБОТЧИК (ваш handler)
// ==========================================
const ALLOWED_INTERESTS = ["subscription", "order", "question"] as const
const DEDUP_WINDOW_MS = 10 * 60 * 1000

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "yclid",
  "fbclid",
] as const

function sanitizeUtm(raw: unknown): Record<string, string> {
  const out: Record<string, string> = {}
  if (raw && typeof raw === "object") {
    for (const key of UTM_KEYS) {
      const v = (raw as Record<string, unknown>)[key]
      if (typeof v === "string" && v) out[key] = v.slice(0, 200)
    }
  }
  return out
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    const body = (req.body ?? {}) as Record<string, unknown>

    const name = typeof body.name === "string" ? body.name.trim() : ""
    const phoneRaw = typeof body.phone === "string" ? body.phone : ""
    const interest = typeof body.interest === "string" ? body.interest : ""
    const comment =
      typeof body.comment === "string" ? body.comment.trim().slice(0, 1000) : ""

    if (!name || name.length > 120) {
      return res.status(400).json({ message: "Укажите имя." })
    }

    const phone = normalizeBelarusPhone(phoneRaw)
    if (!phone) {
      return res.status(400).json({
        message: "Номер не похож на белорусский. Пример: +375 29 123-45-67",
      })
    }

    if (!(ALLOWED_INTERESTS as readonly string[]).includes(interest)) {
      return res.status(400).json({ message: "Выберите, что вас интересует." })
    }

    const utm = sanitizeUtm(body.utm)
    const sourcePage =
      typeof body.sourcePage === "string" ? body.sourcePage.slice(0, 300) : "/"
    const referrer =
      typeof body.referrer === "string" ? body.referrer.slice(0, 300) : null

    const db = getDb()
    const leadsRef = db.collection("leads")

    const cutoff = Date.now() - DEDUP_WINDOW_MS
    const bucket = Math.floor(Date.now() / DEDUP_WINDOW_MS)
    const docId = `lead_${phone.replace("+", "")}_${bucket}`

    const result = await db.runTransaction(async (tx) => {
      const snapshot = await tx.get(leadsRef.where("phone", "==", phone))
      for (const doc of snapshot.docs) {
        const createdAt = doc.data().createdAt
        if (createdAt instanceof Timestamp && createdAt.toMillis() >= cutoff) {
          return { created: false as const }
        }
      }

      tx.set(leadsRef.doc(docId), {
        name,
        phone,
        interest,
        comment,
        utm,
        sourcePage,
        referrer,
        userAgent: req.headers["user-agent"]?.slice(0, 200) ?? null,
        createdAt: FieldValue.serverTimestamp(),
      })

      return { created: true as const }
    })

    if (!result.created) {
      return res.status(200).json({ status: "duplicate" })
    }

    await notifyTelegram({ name, phone, interest, comment, utm, sourcePage })

    return res.status(200).json({ status: "ok" })
  } catch (err) {
    console.error("[lead] unhandled error:", err)
    return res.status(500).json({
      message:
        "Не получилось сохранить заявку. Попробуйте ещё раз через минуту. Если не выйдет — позвоните нам: +375 29 123-45-67.",
    })
  }
}
