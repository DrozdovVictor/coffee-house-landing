type PhotoProps = {
  caption: string
  ratio?: "4/5" | "1/1" | "3/4" | "5/6"
  rotate?: number
  className?: string
  tone?: "paper-deep" | "olive" | "ink" | "accent"
}

const ratioClass = {
  "4/5": "aspect-[4/5]",
  "1/1": "aspect-square",
  "3/4": "aspect-[3/4]",
  "5/6": "aspect-[5/6]",
}

const toneClass = {
  "paper-deep": "bg-paper-deep",
  olive: "bg-olive",
  ink: "bg-ink",
  accent: "bg-accent/15",
}

// Заглушка фото: фиксированный aspect-ratio, подпись «photo: ...», лёгкий поворот.
function Photo({
  caption,
  ratio = "4/5",
  rotate = 0,
  className = "",
  tone = "paper-deep",
}: PhotoProps) {
  return (
    <figure
      className={`relative overflow-hidden border border-line ${ratioClass[ratio]} ${toneClass[tone]} ${className}`}
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
    >
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <figcaption className="absolute bottom-2 left-2 font-sans text-[0.6875rem] caps text-ink-soft/80">
        photo: {caption}
      </figcaption>
    </figure>
  )
}

export default Photo
