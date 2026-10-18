type StampProps = {
  children: React.ReactNode
  rotate?: number
  color?: "accent" | "olive" | "ink"
  className?: string
}

const colorMap = {
  accent: "text-accent",
  olive: "text-olive",
  ink: "text-ink",
}

// Штамп-бейдж: двойная рамка через box-shadow, поворот, caps.
// rotate по умолчанию 0 — бейдж без поворота; поворот задаём только там, где нужно.
function Stamp({
  children,
  rotate = 0,
  color = "accent",
  className = "",
}: StampProps) {
  return (
    <span
      className={`stamp-frame inline-block border border-current px-3 py-1.5 font-sans text-[0.6875rem] font-semibold caps ${colorMap[color]} ${className}`}
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
    >
      {children}
    </span>
  )
}

export default Stamp
