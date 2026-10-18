// Mobile sticky bottom-бар с кнопкой заявки.
// Класс появления добавим позже через JS; пока сверстана и видна на мобильном.
function MobileBar() {
  return (
    <div
      data-mobile-cta
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur-sm md:hidden"
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <div className="min-w-0">
          <p className="font-sans text-[0.6875rem] text-ink-soft">
            Четверг — обжарка
          </p>
          <p className="truncate font-serif text-base font-semibold text-ink">
            Свежая партия к пятнице
          </p>
        </div>
        <a
          href="#lead"
          className="shrink-0 rounded-md bg-accent px-5 py-2.5 font-sans text-[0.75rem] font-semibold text-paper hover:bg-accent-deep"
        >
          Оставить заявку
        </a>
      </div>
    </div>
  )
}

export default MobileBar
