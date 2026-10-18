import { useState } from "react"

const segments = ["Подписка", "Разовый заказ", "Вопрос"] as const
type Segment = (typeof segments)[number]
type Status = "idle" | "success" | "error"

// Форма заявки — olive-блок, сегмент-переключатель, состояния success/error.
function LeadForm() {
  const [segment, setSegment] = useState<Segment>("Подписка")
  const [status, setStatus] = useState<Status>("idle")

  return (
    <section id="lead" className="border-b border-line bg-olive">
      <div className="mx-auto max-w-container px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Левая — приглашение, 5 */}
          <div className="lg:col-span-5">
            <div className="mb-6 flex items-baseline gap-3">
              <span className="font-serif text-sm font-semibold text-paper/70 tnum">
                05
              </span>
              <span className="h-px w-8 bg-paper/30" />
              <span className="font-sans text-[0.6875rem] caps text-paper/70">
                Заявка
              </span>
            </div>
            <h2 className="font-serif text-[1.75rem] font-bold leading-tight tracking-tightest text-paper sm:text-3xl lg:text-[2.5rem]">
              Давайте созвонимся
            </h2>
            <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-paper/80">
              Оставьте номер — менеджер перезвонит и оформит заказ. Это быстрее,
              чем корзина.
            </p>
          </div>

          {/* Правая — форма, 7 */}
          <div className="lg:col-span-7">
            <form
              className="space-y-5"
              aria-label="Форма заявки"
              onSubmit={(e) => {
                e.preventDefault()
                // Логику отправки подключим позже; пока переключаем состояния
                // по порядку для демонстрации разметки.
                setStatus((s) =>
                  s === "idle" ? "success" : s === "success" ? "error" : "idle",
                )
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block font-sans text-[0.6875rem] text-paper/70"
                  >
                    Имя
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Как к вам обращаться"
                    className="w-full rounded-md border border-paper/30 bg-card px-3 py-2.5 font-sans text-base text-ink placeholder:text-ink-soft/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block font-sans text-[0.6875rem] text-paper/70"
                  >
                    Телефон
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    placeholder="+375 29 123-45-67"
                    className={`w-full rounded-md bg-card px-3 py-2.5 font-sans text-base text-ink tnum placeholder:text-ink-soft/60 focus:outline-none focus:ring-2 focus:ring-accent ${
                      status === "error"
                        ? "border-2 border-error"
                        : "border border-paper/30 focus:border-accent"
                    }`}
                  />
                </div>
              </div>

              {/* Сегмент-переключатель */}
              <div>
                <span className="mb-1.5 block font-sans text-[0.6875rem] text-paper/70">
                  Что интересует
                </span>
                <div
                  role="radiogroup"
                  aria-label="Что интересует"
                  className="grid grid-cols-3 overflow-hidden rounded-md border border-paper/30"
                >
                  {segments.map((s, i) => {
                    const active = s === segment
                    return (
                      <button
                        key={s}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => setSegment(s)}
                        className={`px-3 py-2.5 font-sans text-[0.75rem] font-semibold transition-colors ${
                          i > 0 ? "border-l border-paper/30" : ""
                        } ${
                          active
                            ? "bg-card text-ink"
                            : "bg-transparent text-paper/80 hover:bg-paper/10"
                        }`}
                      >
                        {s}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label
                  htmlFor="comment"
                  className="mb-1.5 block font-sans text-[0.6875rem] text-paper/70"
                >
                  Комментарий
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={3}
                  placeholder="Сорт, помол, время доставки — что придёт в голову"
                  className="w-full resize-none rounded-md border border-paper/30 bg-card px-3 py-2.5 font-sans text-base text-ink placeholder:text-ink-soft/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-accent px-6 py-3 font-sans text-sm font-semibold text-paper hover:bg-accent-deep focus-visible:bg-accent-deep sm:w-auto"
              >
                Отправить заявку
              </button>

              <p className="font-sans text-[0.75rem] text-paper/60">
                Перезвоним в течение дня. Никакого спама.
              </p>

              {/* Плашки состояний — рендерятся строго по условию */}
              {status === "success" && (
                <div
                  role="status"
                  className="flex items-start gap-2.5 rounded-md border border-success/40 bg-success/15 px-3 py-2.5"
                >
                  <span className="mt-0.5 font-serif text-success">✓</span>
                  <p className="font-sans text-sm text-paper">
                    Заявка отправлена! Перезвоним в течение дня.
                  </p>
                </div>
              )}
              {status === "error" && (
                <div
                  role="alert"
                  className="rounded-md border border-error/50 bg-error/15 px-3 py-2.5"
                >
                  <p className="font-sans text-sm text-paper">
                    Не отправилось. Проверьте интернет и попробуйте ещё раз.
                    Если не получится — позвоните нам или напишите в Instagram.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LeadForm
