const SERVICES = [
  {
    title: 'Photography',
    detail: 'Editorial, portrait, event &amp; commercial photography — shot and delivered in a consistent, considered style.',
  },
  {
    title: 'Videography',
    detail: 'Short films, music videos, brand films and event coverage, from concept and shoot through to grade.',
  },
  {
    title: 'Graphic Design',
    detail: 'Brand identity, print collateral and social design, built to hold up alongside the photography and film.',
  },
]

export default function Services() {
  return (
    <section id="services" className="border-t border-bone/10">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-safelight">Services</p>
        <h2 className="mt-4 font-display text-3xl font-700 md:text-4xl">What I do</h2>

        <div className="mt-10 divide-y divide-bone/10 border-t border-bone/10">
          {SERVICES.map((s, i) => (
            <div key={s.title} className="group flex flex-col gap-2 py-8 md:flex-row md:items-center md:gap-10">
              <span className="font-mono text-sm text-bone-dim md:w-16">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-display text-2xl font-700 transition-colors group-hover:text-safelight md:w-72">
                {s.title}
              </h3>
              <p className="max-w-xl text-bone/70" dangerouslySetInnerHTML={{ __html: s.detail }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
