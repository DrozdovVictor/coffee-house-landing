import SectionTag from "../SectionTag"

type Coffee = {
  name: string
  tags: string[]
  price: string
  unit: string
  rotate: number
}

const coffees: Coffee[] = [
  {
    name: "Эфиопия Иргачеффе",
    tags: ["цветочный", "бергамот", "светлая обжарка"],
    price: "32 BYN",
    unit: "250 г",
    rotate: -2,
  },
  {
    name: "Колумбия Уила",
    tags: ["карамель", "красное яблоко"],
    price: "29 BYN",
    unit: "250 г",
    rotate: 2,
  },
  {
    name: "Бразилия Серрадо",
    tags: ["орех", "шоколад", "под эспрессо"],
    price: "26 BYN",
    unit: "250 г",
    rotate: -2,
  },
]

// Ассортимент — список-меню, не три одинаковые карточки.
function Assortment() {
  return (
    <section id="coffee" className="border-b border-line">
      <div className="mx-auto max-w-container px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <SectionTag num="02" title="Кофе этой недели" className="mb-8" />

        <h2 className="mb-8 font-serif text-[1.75rem] font-bold leading-tight tracking-tightest sm:text-3xl lg:text-[2.5rem]">
          Три сорта к пятничной доставке
        </h2>

        <ul className="border-t border-line">
          {coffees.map((c) => (
            <li
              key={c.name}
              className="flex flex-col gap-4 border-b border-dashed border-line py-5 sm:flex-row sm:items-center sm:gap-6"
            >
              {/* Миниатюра с лёгкой ротацией */}
              <div
                className="h-18 w-18 shrink-0 border border-line bg-paper-deep sm:h-22 sm:w-22"
                style={{ transform: `rotate(${c.rotate}deg)` }}
                aria-hidden
              />

              <div className="min-w-0 flex-1">
                <h3 className="font-serif text-xl font-semibold leading-tight sm:text-[1.25rem]">
                  {c.name}
                </h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-sm border border-line px-2 py-0.5 font-sans text-[0.6875rem] text-ink-soft"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end sm:justify-center sm:gap-0.5">
                <div className="text-right">
                  <div className="font-sans text-lg font-semibold tnum text-ink">
                    {c.price}
                  </div>
                  <div className="font-sans text-[0.6875rem] text-ink-soft">
                    {c.unit}
                  </div>
                </div>
                <a
                  href="#lead"
                  className="link-dashed inline-flex items-center justify-center rounded-md border border-ink px-3 py-1.5 font-sans text-[0.6875rem] font-semibold text-ink hover:bg-accent hover:border-accent hover:text-paper"
                >
                  Заказать
                </a>
              </div>
            </li>
          ))}
        </ul>

        {/* Дрип-пакеты — отдельная компактная карточка на olive-фоне, чуть шире */}
        <div className="mt-6 border border-olive bg-olive px-5 py-6 sm:mt-8 sm:px-8 sm:py-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            <div className="max-w-md">
              <p className="font-sans text-[0.6875rem] caps text-paper/70">
                для офиса и поездок
              </p>
              <h3 className="mt-1 font-serif text-2xl font-bold leading-tight text-paper">
                Дрип-пакеты, ассорти — 10 штук
              </h3>
              <p className="mt-2 font-sans text-sm text-paper/75">
                Три сорта по пакетикам. Залил водой — готово.
              </p>
            </div>
            <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end sm:gap-1">
              <div className="text-right">
                <div className="font-sans text-2xl font-semibold tnum text-paper">
                  18 BYN
                </div>
              </div>
              <a
                href="#lead"
                className="inline-flex items-center justify-center rounded-md border border-paper px-3 py-1.5 font-sans text-[0.6875rem] font-semibold text-paper hover:bg-paper hover:text-olive"
              >
                Заказать
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Assortment
