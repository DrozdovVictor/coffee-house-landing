// Менеджеру важно знать, из какой рекламы пришёл клиент.
// Читаем метки из URL при каждом заходе и сохраняем в sessionStorage:
// если человек погулял по сайту и вернулся к форме, метки не потеряются.

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

export type UtmParams = Partial<Record<(typeof UTM_KEYS)[number], string>>

const STORAGE_KEY = "kvarta_utm"

/**
 * Возвращает UTM-метки: свежие из URL приоритетнее сохранённых
 * (последний клик с рекламы — самый важный).
 */
export function getUtm(): UtmParams {
  const search = new URLSearchParams(window.location.search)
  const fresh: UtmParams = {}

  for (const key of UTM_KEYS) {
    const value = search.get(key)
    if (value) fresh[key] = value
  }

  const saved = readSaved()

  if (Object.keys(fresh).length > 0) {
    const merged = { ...saved, ...fresh }
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
    } catch {
      // приватный режим / переполнение — не критично, молча пропускаем
    }
    return merged
  }

  return saved
}

function readSaved(): UtmParams {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as UtmParams) : {}
  } catch {
    return {}
  }
}
