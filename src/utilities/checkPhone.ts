// Белорусские мобильные номера: коды 25, 29, 33, 44.
// Допущение: городские (17 и др.) пока не принимаем — аудитория звонит
// с мобильных. Запиши это в README как осознанное решение.

const BELARUS_PHONE_RE = /^375(25|29|33|44)\d{7}$/

/**
 * Приводит любой ввод к канону "+375XXXXXXXXX" или возвращает null,
 * если номер не белорусский мобильный.
 * Понимает: +375 29 123-45-67, 8 029 123-45-67, 375291234567, 291234567.
 */
export function normalizeBelarusPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "")

  let national: string
  if (digits.startsWith("375"))
    national = digits // 375291234567
  else if (digits.startsWith("80"))
    national = "375" + digits.slice(2) // 80291234567
  else if (digits.length === 10 && /^(25|29|33|44)/.test(digits)) {
    national = "375" + digits // 291234567
  } else {
    return null
  }

  return BELARUS_PHONE_RE.test(national) ? "+" + national : null
}

/**
 * Маска ввода: набирает пользователь, а мы форматируем на лету
 * в "+375 (XX) XXX-XX-XX". Невалидные символы отбрасываются.
 */
export function formatBelarusPhone(raw: string): string {
  let d = raw.replace(/\D/g, "")

  // приводим любой старт к "375..."
  if (d.startsWith("80")) d = d.slice(2)
  else if (d.startsWith("375")) d = d.slice(3)
  else if (d.startsWith("8")) d = d.slice(1)
  d = d.slice(0, 9) // 2 + 7 цифр после кода страны

  const code = d.slice(0, 2)
  const p1 = d.slice(2, 5)
  const p2 = d.slice(5, 7)
  const p3 = d.slice(7, 9)

  let out = "+375"
  if (code) out += ` (${code}`
  if (p1) out += `) ${p1}`
  if (p2) out += `-${p2}`
  if (p3) out += `-${p3}`
  return out
}
