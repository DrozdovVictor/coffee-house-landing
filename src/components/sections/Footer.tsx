// Footer — минимальный, на ink-фоне.
function Footer() {
  return (
    <footer id="contacts" className="bg-ink text-paper">
      <div className="mx-auto max-w-container px-4 py-12 pb-24 sm:px-6 sm:py-14 md:pb-14">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <span className="stamp-frame inline-flex flex-col items-center border border-paper px-2 py-1 text-paper">
              <span className="font-serif text-base font-bold leading-none tracking-tightest">
                КВАРТА
              </span>
              <span className="mt-0.5 text-[0.5625rem] caps text-paper/70">
                обжарка · Минск
              </span>
            </span>
            <p className="mt-4 max-w-xs font-sans text-sm text-paper/70">
              Маленькая обжарка с 2019 года. Партии по 5 кг, четверг — обжарка,
              пятница — доставка.
            </p>
          </div>

          <div>
            <h3 className="font-sans text-[0.6875rem] caps text-paper/60">
              Адрес
            </h3>
            <p className="mt-3 font-serif text-lg leading-snug">
              Минск, ул. Короля, 9
            </p>
            <p className="mt-1 font-sans text-sm text-paper/70">
              пн–пт 8:00–20:00
            </p>
            <p className="font-sans text-sm text-paper/70">сб–вс 10:00–18:00</p>
          </div>

          <div>
            <h3 className="font-sans text-[0.6875rem] caps text-paper/60">
              Связь
            </h3>
            <p className="mt-3 font-sans text-sm text-paper/80">
              Instagram: @kvarta.coffee
            </p>
            <p className="mt-1 font-sans text-sm text-paper/80 tnum">
              +375 29 123-45-67
            </p>
          </div>

          <div>
            <h3 className="font-sans text-[0.6875rem] caps text-paper/60">
              Сейчас
            </h3>
            <p className="mt-3 max-w-[14rem] font-serif text-base italic text-paper/85">
              Партия этой недели обжаривается в четверг.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-paper/15 pt-5">
          <p className="font-sans text-[0.6875rem] caps text-paper/50">
            © 2019–2026 Кварта · Минск
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
