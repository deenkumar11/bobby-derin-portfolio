import { useState } from 'react'
import { useWork } from '../lib/useWork'

const FILTERS = [
  { label: 'All work', value: 'all' },
  { label: 'Photography', value: 'photography' },
  { label: 'Videography', value: 'videography' },
  { label: 'Design', value: 'design' },
  { label: 'Product Photography', value: 'product-photography' },
]

const VIDEO_EXT_PATTERN = /\.(mp4|mov|webm|m4v)$/i

function Caption({ item }) {
  return (
    <div className="absolute inset-x-0 bottom-0 translate-y-full bg-ink/90 p-4 backdrop-blur-sm transition-transform duration-300 ease-out group-hover:translate-y-0">
      <p className="font-body text-sm font-600 text-bone">{item.title}</p>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-safelight">
        {item.category} · {item.year}
      </p>
      {item.camera && <p className="mt-1 font-mono text-[11px] text-bone-dim">{item.camera}</p>}
    </div>
  )
}

function VideoTile({ item }) {
  return (
    <div className="group relative mb-4 block break-inside-avoid overflow-hidden bg-ink-soft">
      <video
        src={item.image_url}
        controls
        preload="metadata"
        className="block h-auto w-full"
      />
      <Caption item={item} />
    </div>
  )
}

function PhotoTile({ item }) {
  return (
    <a
      href={item.image_url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open full-size image: ${item.title}`}
      className="group relative mb-4 block break-inside-avoid cursor-zoom-in overflow-hidden bg-ink-soft"
    >
      {/* No fixed aspect ratio / object-cover here on purpose — each photo
          keeps its own natural orientation (portrait, landscape, square)
          instead of being force-cropped into a uniform box. */}
      <img
        src={item.image_url}
        alt={item.title}
        loading="lazy"
        className="block h-auto w-full grayscale-[15%] transition duration-700 ease-out group-hover:scale-[1.02] group-hover:grayscale-0"
      />
      <Caption item={item} />
    </a>
  )
}

function WorkTile({ item }) {
  const isVideo = VIDEO_EXT_PATTERN.test(item.image_url ?? '')
  return isVideo ? <VideoTile item={item} /> : <PhotoTile item={item} />
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

      {/* CSS columns give a masonry layout — each tile keeps its own height
          based on its image's/video's real aspect ratio, instead of a
          uniform grid that force-crops everything the same shape. */}
      <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {loading && items.length === 0
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="mb-4 aspect-[4/5] w-full break-inside-avoid animate-pulse bg-ink-soft" />
            ))
          : items.map((item) => <WorkTile key={item.id} item={item} />)}
      </div>
    </section>
  )
}