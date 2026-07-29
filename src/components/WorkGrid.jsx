import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useWorkEvents } from '../lib/useWork'

const FILTERS = [
  { label: 'All work', value: 'all' },
  { label: 'Photography', value: 'photography' },
  { label: 'Videography', value: 'videography' },
  { label: 'Design', value: 'design' },
]

function EventCard({ event }) {
  const cover = event.cover
  return (
    <Link
      to={`/event/${event.slug}`}
      aria-label={`View all photos from ${event.title}`}
      className="group relative block overflow-hidden bg-ink-soft"
    >
      <div className="aspect-[4/5] w-full overflow-hidden">
        <img
          src={cover?.image_url}
          alt={event.title}
          loading="lazy"
          className="h-full w-full object-cover grayscale-[15%] transition duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
        />
      </div>

      {event.photoCount > 1 && (
        <span className="absolute right-3 top-3 rounded-full bg-ink/80 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-bone backdrop-blur-sm">
          {event.photoCount} photos
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 translate-y-full bg-ink/90 p-4 backdrop-blur-sm transition-transform duration-300 ease-out group-hover:translate-y-0">
        <p className="font-body text-sm font-600 text-bone">{event.title}</p>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-safelight">
          {event.category} · {event.year}
        </p>
        {cover?.camera && (
          <p className="mt-1 font-mono text-[11px] text-bone-dim">{cover.camera}</p>
        )}
      </div>
    </Link>
  )
}

export default function WorkGrid() {
  const [medium, setMedium] = useState('all')
  const { events, loading } = useWorkEvents(medium)

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
        {loading && events.length === 0
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] animate-pulse bg-ink-soft" />
            ))
          : events.map((event) => <EventCard key={event.slug} event={event} />)}
      </div>
    </section>
  )
}
