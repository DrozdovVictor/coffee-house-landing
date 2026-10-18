import Stamp from "../Stamp"

// Подписка — olive-блок с перфорацией сверху, талон справа со штампом.
function Subscription() {
  return (
    <section id="subscription" className="border-b border-line">
      {/* Перфорация-зигзаг */}
      <div className="perf-top h-3 w-full" aria-hidden />

      <div className="bg-olive">
        <div className="mx-auto max-w-container px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
          <div className="mb-6 flex items-baseline gap-3">
            <span className="font-serif text-sm font-semibold text-paper/70 tnum">
              03
            </span>
            <span className="h-px w-8 bg-paper/30" />
            <span className="font-sans text-[0.6875rem] caps text-paper/70">
              Подписка
            </span>
          </div>

          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Левая — 7 */}
            <div className="lg:col-span-7">
              <h2 className="font-serif text-[1.75rem] font-bold leading-tight tracking-tightest text-paper sm:text-3xl lg:text-[2.5rem]">
                Кофе по расписанию
              </h2>
              <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-paper/80">
                Две пачки по 250 г раз в месяц. Доставка бесплатно. Можно
                заморозить или отменить когда угодно.
              </p>
              <a
                href="#lead"
                className="mt-8 inline-flex items-center justify-center rounded-md bg-paper px-6 py-3 font-sans text-sm font-semibold text-olive hover:bg-accent hover:text-paper"
              >
                Оформить подписку
              </a>
            </div>

            {/* Правая — талон подписки, 5 */}
            <div className="relative lg:col-span-5">
              <div className="relative border border-paper/40 bg-card p-6 sm:p-7">
                <div className="flex items-baseline justify-between border-b border-dashed border-line pb-3">
                  <span className="font-sans text-[0.6875rem] caps text-ink-soft">
                    талон подписки
                  </span>
                  <span className="font-sans text-[0.6875rem] caps text-ink-soft">
                    {Intl.DateTimeFormat("ru-RU", { month: "long" }).format(
                      new Date(),
                    )}
                  </span>
                </div>

                <dl className="mt-4 space-y-2 font-sans text-sm text-ink">
                  <div className="flex justify-between">
                    <dt className="text-ink-soft">Состав</dt>
                    <dd>2 × 250 г, сорт месяца</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-soft">Доставка</dt>
                    <dd>раз в месяц, бесплатно</dd>
                  </div>
                </dl>

                <div className="mt-5 border-t border-dashed border-line pt-4">
                  <div className="font-serif text-4xl font-bold tnum text-ink">
                    54 BYN
                    <span className="text-lg font-semibold text-ink-soft">
                      /мес
                    </span>
                  </div>
                </div>
              </div>

              <Stamp
                rotate={-8}
                color="accent"
                className="absolute -right-2 -top-3 bg-card"
              >
                доставка бесплатно
              </Stamp>
            </div>
          </div>
        </div>
      </div>

      <div className="perf-top h-3 w-full rotate-180" aria-hidden />
    </section>
  )
}

export default Subscription
