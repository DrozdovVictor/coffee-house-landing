import Photo from "../Photo"
import SectionTag from "../SectionTag"

const facts = [
  { num: "5 кг", text: "размер партии" },
  { num: "1–3 дня", text: "от обжарки до вашей чашки" },
  { num: "0", text: "склад, которого у нас нет" },
]

// «Почему свежесть» — зеркало hero: сетка 5/7, текст слева, фото справа с маргиналией.
function Freshness() {
  return (
    <section id="freshness" className="border-b border-line">
      <div className="mx-auto max-w-container px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <SectionTag
          num="01"
          title="Почему свежесть — это не маркетинг"
          className="mb-8"
        />

        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Текст — 5 (слева) */}
          <div className="lg:col-span-5">
            <h2 className="font-serif text-[1.75rem] font-bold leading-tight tracking-tightest sm:text-3xl lg:text-[2.5rem]">
              Мы 10 лет стояли за баром и знаем, когда кофе умирает.
            </h2>
            <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-ink-soft">
              Поэтому обжариваем маленькими партиями и не держим склад. Аня и
              Дмитрий, бывшие бариста. С 2019 года.
            </p>

            {/* Три факта как строки чека */}
            <dl className="mt-8 border-t border-line">
              {facts.map((f) => (
                <div
                  key={f.text}
                  className="flex items-baseline justify-between gap-6 border-b border-dashed border-line py-4"
                >
                  <dt className="font-serif text-2xl font-bold tnum text-ink sm:text-3xl">
                    {f.num}
                  </dt>
                  <dd className="text-right font-sans text-[0.75rem] caps text-ink-soft">
                    {f.text}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Фото — 7 (справа), с вертикальной маргиналией */}
          <div className="relative lg:col-span-7">
            <div className="lg:ml-12">
              <Photo
                caption="наша мастерская, ростёр"
                ratio="5/6"
                tone="paper-deep"
                className="w-full sm:w-[85%]"
              />
            </div>
            <p className="mt-3 max-w-[8rem] font-sans text-[0.6875rem] caps leading-relaxed text-ink-soft sm:absolute sm:-left-2 sm:top-2 sm:ml-0 sm:max-w-[7rem] sm:rotate-[-90deg] sm:origin-top-left sm:translate-y-0">
              наш ростёр · 5 кг · каждую неделю
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Freshness
