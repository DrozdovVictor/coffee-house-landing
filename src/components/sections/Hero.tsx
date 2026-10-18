import Stamp from "../Stamp"
import Photo from "../Photo"

// «Лента недели» — отрывной талон: три ячейки через пунктир.
// Текущий день определяется по getDay(): пн–ср (1–3) → чт (4) → пт (5).
// сб/вс не выделяют ни одну ячейку.
const week = [
  {
    id: "mon",
    label: "пн–ср",
    text: "принимаем заказы",
    match: (d: number) => d >= 1 && d <= 3,
  },
  { id: "thu", label: "чт", text: "обжарка", match: (d: number) => d === 4 },
  {
    id: "fri",
    label: "пт",
    text: "доставка и самовывоз",
    match: (d: number) => d === 5,
  },
]

function todayIndex(): number {
  if (typeof Date === "undefined") return -1
  return new Date().getDay()
}

// Hero: сетка 7/5, асимметрия, штамп поверх угла фото, лента-талон снизу.
function Hero() {
  const today = todayIndex()

  return (
    <section id="top" className="relative border-b border-line">
      <div className="mx-auto max-w-container px-4 py-12 sm:px-6 sm:py-16 lg:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Левая колонка — 7 */}
          <div className="lg:col-span-7">
            <Stamp rotate={-6} color="accent" className="mb-6">
              свежая партия — четверг
            </Stamp>

            <h1 className="font-serif text-[2.25rem] font-bold leading-[1.05] tracking-tightest sm:text-5xl lg:text-[4.25rem]">
              Кофе, который обжарили{" "}
              <span className="italic text-accent-deep">на этой неделе</span>
            </h1>

            <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-ink-soft sm:text-lg">
              Обжариваем партиями по 5 кг в четверг и развозим по Минску в
              пятницу. От ростера к вашей чашке — 1–3 дня.
            </p>

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
              <a
                href="#coffee"
                className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 font-sans text-sm font-semibold text-paper hover:bg-accent-deep focus-visible:bg-accent-deep"
              >
                Выбрать кофе
              </a>
              <a
                href="#freshness"
                className="link-dashed link-dashed--dotted font-sans text-sm text-ink hover:text-accent"
              >
                Как мы работаем ↓
              </a>
            </div>
          </div>

          {/* Правая колонка — 5, со смещением и штампом поверх угла */}
          <div className="relative lg:col-span-5 lg:mt-6">
            <Photo
              caption="пакет зерна, четверг"
              ratio="4/5"
              tone="paper-deep"
              className="w-full"
            />
            <Stamp
              rotate={-8}
              color="accent"
              className="absolute -left-3 -top-3 bg-paper/60 text-accent sm:-left-5 sm:-top-4"
            >
              обжарено в четверг
            </Stamp>
          </div>
        </div>

        {/* Лента-талон недели */}
        <div
          id="how"
          className="mt-12 grid grid-cols-1 border border-line bg-card sm:mt-16 sm:grid-cols-3"
          data-week-talon="true"
        >
          {week.map((d, i) => {
            const current = d.match(today)
            return (
              <div
                key={d.id}
                data-day={d.id}
                data-current={current ? "true" : undefined}
                className={`relative flex items-start gap-3 px-4 py-4 sm:px-6 sm:py-5 ${
                  i < week.length - 1
                    ? "border-b border-dashed border-line sm:border-b-0 sm:border-r"
                    : ""
                } ${current ? "bg-accent/10" : ""}`}
              >
                <span
                  className={`font-serif text-2xl font-bold tnum ${current ? "text-accent" : "text-ink"}`}
                >
                  {d.label}
                </span>
                <span className="mt-1 font-sans text-sm text-ink-soft">
                  {d.text}
                </span>
                {current && (
                  <span className="absolute right-3 top-3 text-[0.625rem] caps text-accent">
                    сегодня
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Hero
