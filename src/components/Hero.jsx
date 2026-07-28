export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-40 pb-16 md:pt-48">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-wrap items-start justify-between gap-6 font-mono text-xs uppercase tracking-[0.2em] text-bone-dim">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-safelight" />
            Available for work · 2026
          </span>
          <span>Chennai, India</span>
        </div>

        <h1 className="mt-8 font-display text-[16vw] font-800 leading-[0.85] tracking-tight text-bone md:text-[9.5rem]">
          bobby
          <br />
          derin
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-6 border-t border-bone/10 pt-6 font-mono text-sm text-bone-dim md:grid-cols-3">
          <p>Photography · Videography<br />Graphic Design</p>
          <p>6 years documenting people,<br />places &amp; brands</p>
          <p className="md:text-right">
            <a href="#work" className="underline decoration-safelight decoration-2 underline-offset-4 text-bone hover:text-safelight">
              View the work
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
