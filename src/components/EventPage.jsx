import { useParams, Link } from 'react-router-dom'
import { useEventPhotos } from '../lib/useWork'

function Photo({ photo }) {
  return (
    <a
      href={photo.image_url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open full-size photo: ${photo.title}`}
      className="group relative block cursor-zoom-in overflow-hidden bg-ink-soft"
    >
      <div className="aspect-[4/5] w-full overflow-hidden">
        <img
          src={photo.image_url}
          alt={photo.title}
          loading="lazy"
          className="h-full w-full object-cover grayscale-[10%] transition duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
        />
      </div>
      {photo.camera && (
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-ink/90 p-3 backdrop-blur-sm transition-transform duration-300 ease-out group-hover:translate-y-0">
          <p className="font-mono text-[11px] text-bone-dim">{photo.camera}</p>
        </div>
      )}
    </a>
  )
}

export default function EventPage() {
  const { slug } = useParams()
  const { event, loading, notFound } = useEventPhotos(slug)

  return (
    <div className="min-h-screen bg-ink text-bone">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-bone/10 bg-ink/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <Link to="/" className="font-mono text-xs tracking-[0.25em] text-bone-dim uppercase">
            Bobby Derin
          </Link>
          <Link
            to="/#work"
            className="font-mono text-xs uppercase tracking-[0.15em] text-bone/80 transition-colors hover:text-safelight"
          >
            ← Back to work
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 pt-40 pb-24 md:px-10">
        {loading && (
          <p className="font-mono text-sm text-bone-dim">Loading…</p>
        )}

        {!loading && notFound && (
          <div>
            <h1 className="font-display text-3xl font-700">Event not found</h1>
            <p className="mt-4 text-bone/70">
              This gallery doesn't exist or isn't published.{' '}
              <Link to="/#work" className="text-safelight underline underline-offset-4">
                Back to all work
              </Link>
            </p>
          </div>
        )}

        {!loading && event && (
          <>
            <div className="border-b border-bone/10 pb-8">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-safelight">
                {event.category} · {event.year}
              </p>
              <h1 className="mt-4 font-display text-4xl font-700 md:text-5xl">{event.title}</h1>
              <p className="mt-3 font-mono text-sm text-bone-dim">
                {event.photoCount} photo{event.photoCount > 1 ? 's' : ''} from this shoot · click any photo to open full size
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {event.photos.map((photo) => (
                <Photo key={photo.id} photo={photo} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
