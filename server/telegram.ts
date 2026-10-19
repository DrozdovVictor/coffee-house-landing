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

export async function notifyTelegram(lead: TelegramLead): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return // бот не настроен — тихо пропускаем

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

  // Таймаут 2с: Telegram не должен тормозить ответ формы.
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
