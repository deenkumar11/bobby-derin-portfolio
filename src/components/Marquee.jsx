const WORDS = ['PHOTOGRAPHY', 'VIDEOGRAPHY', 'GRAPHIC DESIGN']

function Track() {
  return (
    <span className="marquee-track">
      {[...Array(2)].map((_, loop) =>
        WORDS.map((w, i) => (
          <span key={`${loop}-${i}`} className="mx-6 flex items-center gap-6 font-display text-4xl font-700 text-bone/90 md:text-6xl">
            {w}
            <span className="h-2 w-2 rounded-full bg-safelight" />
          </span>
        ))
      )}
    </span>
  )
}

export default function Marquee() {
  return (
    <div className="border-y border-bone/10 bg-ink-soft py-6 overflow-hidden">
      <Track />
    </div>
  )
}
