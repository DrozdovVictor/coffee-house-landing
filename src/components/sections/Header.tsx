const links = [
  { href: "#coffee", label: "Кофе" },
  { href: "#subscription", label: "Подписка" },
  { href: "#delivery", label: "Доставка" },
  { href: "#contacts", label: "Контакты" },
]

// Sticky-хедер: бумажный фон, blur, 1px-линия снизу, одна мягкая тень на весь лендинг.
function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-40 border-b border-line bg-paper/85 backdrop-blur-sm shadow-header">
      <div className="mx-auto flex h-16 max-w-container items-center justify-between gap-4 px-4 sm:px-6">
        <a
          href="#top"
          className="group flex items-center gap-3"
          aria-label="Кварта — на главную"
        >
          <span className="stamp-frame inline-flex flex-col items-center border border-ink px-2 py-1 text-ink">
            <span className="font-serif text-base font-bold leading-none tracking-tightest">
              КВАРТА
            </span>
            <span className="mt-0.5 text-[0.5625rem] caps text-ink-soft">
              обжарка · Минск
            </span>
          </span>
        </a>

        <nav
          className="hidden items-center gap-6 md:flex"
          aria-label="Основная навигация"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-dashed font-sans text-[0.75rem] text-ink-soft hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#lead"
          className="inline-flex items-center justify-center rounded-md bg-ink px-4 py-2 font-sans text-[0.75rem] font-semibold text-paper hover:bg-accent-deep focus-visible:bg-accent-deep"
        >
          Оставить заявку
        </a>
      </div>
    </header>
  )
}

export default Header
