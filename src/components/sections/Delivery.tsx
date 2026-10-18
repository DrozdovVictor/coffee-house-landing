import SectionTag from "../SectionTag"

const deliveryRows = [
  { k: "пятница", v: "день доставки" },
  { k: "бесплатно", v: "от 50 BYN" },
  { k: "привезём", v: "к двери" },
]

// Доставка и самовывоз — две колонки, оформленные по-разному.
function Delivery() {
  return (
    <section id="delivery" className="border-b border-line">
      <div className="mx-auto max-w-container px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <SectionTag num="04" title="Доставка и самовывоз" className="mb-8" />

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Самовывоз — карточка на paper-deep, адрес крупно serif */}
          <div className="border border-line bg-paper-deep p-6 sm:p-8">
            <h3 className="font-sans text-[0.6875rem] caps text-ink-soft">
              Самовывоз
            </h3>
            <p className="mt-3 font-serif text-2xl font-bold leading-tight tracking-tightest sm:text-3xl">
              Минск, ул. Короля, 9
            </p>
            <div className="mt-5 space-y-1 border-t border-dashed border-line pt-4 font-sans text-sm text-ink-soft">
              <p>пн–пт 8:00–20:00</p>
              <p>сб–вс 10:00–18:00</p>
            </div>
          </div>

          {/* Доставка по Минску — карточка-список через пунктир */}
          <div className="border border-line bg-card p-6 sm:p-8">
            <h3 className="font-sans text-[0.6875rem] caps text-ink-soft">
              Доставка по Минску
            </h3>
            <ul className="mt-3 border-t border-line">
              {deliveryRows.map((r) => (
                <li
                  key={r.k}
                  className="flex items-baseline justify-between gap-6 border-b border-dashed border-line py-3"
                >
                  <span className="font-serif text-lg font-semibold text-ink">
                    {r.k}
                  </span>
                  <span className="text-right font-sans text-sm text-ink-soft">
                    {r.v}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Пометка «от руки» */}
        <p
          className="mt-6 max-w-md font-serif text-base italic text-ink-soft sm:mt-8"
          style={{ transform: "rotate(-1.5deg)" }}
        >
          Закажете до среды — попадёте в пятничную доставку.
        </p>
      </div>
    </section>
  )
}

export default Delivery
