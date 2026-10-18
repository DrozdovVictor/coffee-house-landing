type SectionTagProps = {
  num: string
  title: string
  className?: string
}

// Нумерация секций как в журнале: «01 — Кофе этой недели».
function SectionTag({ num, title, className = "" }: SectionTagProps) {
  return (
    <div className={`flex items-baseline gap-3 ${className}`}>
      <span className="font-serif text-sm font-semibold text-accent tnum">
        {num}
      </span>
      <span className="h-px w-8 bg-line" />
      <span className="font-sans text-[0.6875rem] caps text-ink-soft">
        {title}
      </span>
    </div>
  )
}

export default SectionTag
