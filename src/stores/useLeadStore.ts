import { create } from "zustand"
import { normalizeBelarusPhone } from "../utilities/checkPhone"
import { getUtm } from "../utilities/utm"

export type Interest = "subscription" | "order" | "question"
export type LeadStatus =
  | "idle"
  | "submitting"
  | "success"
  | "duplicate"
  | "error"

interface FieldErrors {
  name?: string
  phone?: string
}

interface LeadState {
  // данные формы
  name: string
  phone: string
  interest: Interest
  comment: string

  // состояние отправки
  status: LeadStatus
  errorText: string | null
  fieldErrors: FieldErrors

  // действия
  setName: (v: string) => void
  setPhone: (v: string) => void
  setInterest: (v: Interest) => void
  setComment: (v: string) => void
  submit: () => Promise<void>
}

export const useLeadStore = create<LeadState>((set, get) => ({
  name: "",
  phone: "",
  interest: "subscription",
  comment: "",
  status: "idle",
  errorText: null,
  fieldErrors: {},

  setName: (v) =>
    set({ name: v, fieldErrors: { ...get().fieldErrors, name: undefined } }),
  setPhone: (v) =>
    set({ phone: v, fieldErrors: { ...get().fieldErrors, phone: undefined } }),
  setInterest: (v) => set({ interest: v }),
  setComment: (v) => set({ comment: v }),

  submit: async () => {
    // 1) Защита от двойного клика: кнопка disabled + этот guard
    if (get().status === "submitting") return

    // 2) Валидация до запроса
    const fieldErrors: FieldErrors = {}
    const name = get().name.trim()
    const phone = normalizeBelarusPhone(get().phone)

    if (!name) fieldErrors.name = "Представьтесь, пожалуйста"
    if (!phone) {
      fieldErrors.phone =
        "Номер не похож на белорусский. Пример: +375 29 123-45-67"
    }

    if (Object.keys(fieldErrors).length > 0) {
      set({ fieldErrors })
      return
    }

    // 3) Отправка
    set({ status: "submitting", errorText: null })

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone, // уже канонический "+375XXXXXXXXX"
          interest: get().interest,
          comment: get().comment.trim(),
          utm: getUtm(),
          sourcePage: window.location.pathname,
          referrer: document.referrer || null,
        }),
      })

      if (res.ok) {
        const data = (await res.json()) as { status?: string }

        if (data.status === "duplicate") {
          // Повторная заявка за 10 минут: форму НЕ очищаем,
          // человек видит "мы уже получили вашу заявку"
          set({ status: "duplicate" })
          return
        }

        // Успех: чистим форму, показываем подтверждение
        set({
          status: "success",
          name: "",
          phone: "",
          comment: "",
          interest: "subscription",
        })
        return
      }

      // 4xx/5xx: сервер вернул человеческое сообщение — показываем его
      let message = "Не отправилось. Проверьте интернет и попробуйте ещё раз."
      try {
        const data = (await res.json()) as { message?: string }
        if (data?.message) message = data.message
      } catch {
        // тело не JSON — оставляем дефолт
      }
      set({ status: "error", errorText: message })
    } catch {
      // сеть упала / сервер недоступен
      set({
        status: "error",
        errorText:
          "Не отправилось. Проверьте интернет и попробуйте ещё раз. Если не получится — позвоните нам или напишите в Instagram.",
      })
    }
  },
}))
