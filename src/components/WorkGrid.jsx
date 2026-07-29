import { useState } from 'react'
import { useWork } from '../lib/useWork'

const FILTERS = [
  { label: 'All work', value: 'all' },
  { label: 'Photography', value: 'photography' },
  { label: 'Videography', value: 'videography' },
  { label: 'Design', value: 'design' },
]

function WorkCard({ item }) {
  const src = item.image_path ? item.fallback_url : item.fallback_url
  return (
    <a
      href={src}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open full-size image: ${item.title}`}
      className="group relative block cursor-zoom-in overflow-hidden bg-ink-soft"
    >
      <div className="aspect-[4/5] w-full overflow-hidden">
        <img
          src={src}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover grayscale-[15%] transition duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 translate-y-full bg-ink/90 p-4 backdrop-blur-sm transition-transform duration-300 ease-out group-hover:translate-y-0">
        <p className="font-body text-sm font-600 text-bone">{item.title}</p>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-safelight">
          {item.category} · {item.year}
        </p>
        <p className="mt-1 font-mono text-[11px] text-bone-dim">{item.camera}</p>
      </div>
    </a>
  )
}

export default function WorkGrid() {
  const [medium, setMedium] = useState('all')
  const { items, loading } = useWork(medium)

  return (
    <section id="work" className="mx-auto max-w-7xl px-6 py-24 md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-bone/10 pb-8">
        <h2 className="font-display text-4xl font-700 md:text-5xl">Selected work</h2>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setMedium(f.value)}
              className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors ${
                medium === f.value
                  ? 'border-safelight bg-safelight text-ink'
                  : 'border-bone/20 text-bone-dim hover:border-bone/50 hover:text-bone'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading && items.length === 0
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] animate-pulse bg-ink-soft" />
            ))
          : items.map((item) => <WorkCard key={item.id} item={item} />)}
      </div>
    </section>
  )
}