import type { VercelRequest, VercelResponse } from "@vercel/node"
import { Timestamp, FieldValue } from "firebase-admin/firestore"
import { getDb } from "../server/firebase"
import { notifyTelegram } from "../server/telegram"
import { normalizeBelarusPhone } from "../src/utilities/checkPhone"

const ALLOWED_INTERESTS = ["subscription", "order", "question"] as const
const DEDUP_WINDOW_MS = 10 * 60 * 1000 // 10 минут — требование ТЗ

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
