export default function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-24 md:px-10">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-safelight">About</p>
          <h2 className="mt-4 font-display text-3xl font-700 leading-tight md:text-4xl">
            Frames, footage &amp; folios — one visual language.
          </h2>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <p className="text-lg leading-relaxed text-bone/90 md:text-xl">
            Bobby Derin is a Chennai-based visual artist working across photography, film and
            graphic design. What started with a camera on the streets of Chennai has grown into
            a practice that moves fluidly between a still frame, a moving one, and the printed
            page — always in service of a story worth telling clearly.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-8 border-t border-bone/10 pt-8 sm:grid-cols-4">
            {[
              ['6+', 'Years shooting'],
              ['120+', 'Projects delivered'],
              ['3', 'Disciplines'],
              ['IN', 'Based in Chennai'],
            ].map(([stat, label]) => (
              <div key={label}>
                <p className="font-display text-3xl font-700 text-bone">{stat}</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-widest text-bone-dim">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
