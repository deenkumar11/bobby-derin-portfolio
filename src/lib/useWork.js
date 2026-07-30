import { useEffect, useState } from 'react'
import { supabase, publicUrlFor } from './supabaseClient'

// Fallback sample data so the site still looks complete before Supabase is
// wired up or if a query fails. Replace by inserting rows into `work_items`.
// Photos that share the same event_slug are grouped into one event/gallery.
const FALLBACK_WORK = [
  {
    id: 'fallback-1a',
    title: 'Harbour Line, Chennai — 1',
    medium: 'photography',
    category: 'Editorial',
    year: 2025,
    camera: 'Sony A7IV · 35mm · f/2.8 · 1/250s · ISO 400',
    image_path: null,
    event_slug: 'harbour-line-chennai',
    event_title: 'Harbour Line, Chennai',
    is_cover: true,
    sort_order: 0,
    image_url: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'fallback-1b',
    title: 'Harbour Line, Chennai — 2',
    medium: 'photography',
    category: 'Editorial',
    year: 2025,
    camera: 'Sony A7IV · 50mm · f/4 · 1/320s · ISO 400',
    image_path: null,
    event_slug: 'harbour-line-chennai',
    event_title: 'Harbour Line, Chennai',
    is_cover: false,
    sort_order: 1,
    image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'fallback-1c',
    title: 'Harbour Line, Chennai — 3',
    medium: 'photography',
    category: 'Editorial',
    year: 2025,
    camera: 'Sony A7IV · 85mm · f/2 · 1/500s · ISO 200',
    image_path: null,
    event_slug: 'harbour-line-chennai',
    event_title: 'Harbour Line, Chennai',
    is_cover: false,
    sort_order: 2,
    image_url: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'fallback-2a',
    title: 'Monsoon Portraits — 1',
    medium: 'photography',
    category: 'Portrait',
    year: 2025,
    camera: 'Sony A7IV · 85mm · f/1.8 · 1/500s · ISO 200',
    image_path: null,
    event_slug: 'monsoon-portraits',
    event_title: 'Monsoon Portraits',
    is_cover: true,
    sort_order: 0,
    image_url: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'fallback-2b',
    title: 'Monsoon Portraits — 2',
    medium: 'photography',
    category: 'Portrait',
    year: 2025,
    camera: 'Sony A7IV · 85mm · f/1.8 · 1/500s · ISO 200',
    image_path: null,
    event_slug: 'monsoon-portraits',
    event_title: 'Monsoon Portraits',
    is_cover: false,
    sort_order: 1,
    image_url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'fallback-3',
    title: 'Nightfall — Short Film',
    medium: 'videography',
    category: 'Direction',
    year: 2024,
    camera: 'FX3 · 24fps · Log3',
    image_path: null,
    event_slug: 'nightfall-short-film',
    event_title: 'Nightfall — Short Film',
    is_cover: true,
    sort_order: 0,
    image_url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'fallback-4',
    title: 'Anchor Coffee — Brand Identity',
    medium: 'design',
    category: 'Branding',
    year: 2024,
    camera: 'Figma · CMYK · Letterpress stock',
    image_path: null,
    event_slug: 'anchor-coffee-branding',
    event_title: 'Anchor Coffee — Brand Identity',
    is_cover: true,
    sort_order: 0,
    image_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
  },
]

function normalizeRow(row) {
  return {
    ...row,
    image_url: row.image_path ? publicUrlFor(row.image_path) : row.image_url,
  }
}

// Groups a flat list of work_item rows into one entry per event.
// Photos with no event_slug are treated as their own single-photo event.
function groupIntoEvents(items) {
  const map = new Map()

  for (const item of items) {
    const key = item.event_slug || item.id
    if (!map.has(key)) {
      map.set(key, {
        slug: key,
        title: item.event_title || item.title,
        medium: item.medium,
        category: item.category,
        year: item.year,
        photos: [],
        cover: null,
      })
    }
    const group = map.get(key)
    group.photos.push(item)
    if (item.is_cover || !group.cover) group.cover = item
  }

  // Prefer the explicitly-flagged cover photo if one exists in the group
  for (const group of map.values()) {
    const flaggedCover = group.photos.find((p) => p.is_cover)
    if (flaggedCover) group.cover = flaggedCover
    group.photoCount = group.photos.length
  }

  return Array.from(map.values())
}

// Returns events (one card per shoot) for the home page grid, optionally
// filtered by medium.
export function useWorkEvents(medium = 'all') {
  const [events, setEvents] = useState(groupIntoEvents(FALLBACK_WORK))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      let query = supabase
        .from('work_items')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true })

      if (medium !== 'all') {
        query = query.eq('medium', medium)
      }

      const { data, error } = await query
      if (cancelled) return

      if (error || !data || data.length === 0) {
        if (error) console.warn('[useWorkEvents] falling back to sample data:', error.message)
        const fallback = medium === 'all' ? FALLBACK_WORK : FALLBACK_WORK.filter((w) => w.medium === medium)
        setEvents(groupIntoEvents(fallback))
      } else {
        setEvents(groupIntoEvents(data.map(normalizeRow)))
      }
      setLoading(false)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [medium])

  return { events, loading }
}

// Returns every photo belonging to one event (ignores the medium filter —
// an event page always shows its full set of photos).
export function useEventPhotos(slug) {
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setNotFound(false)

      // Fallback data path (also used if the slug matches a fallback event
      // and Supabase has nothing, e.g. before it's wired up)
      const fallbackMatch = groupIntoEvents(FALLBACK_WORK).find((e) => e.slug === slug)

      // Use .eq()/.or() builder methods (which safely escape values) rather
      // than hand-building a raw filter string — a slug containing spaces
      // or other special characters would otherwise break Supabase's filter
      // syntax and return a 400.
      const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

      let queryBuilder = supabase
        .from('work_items')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true })

      queryBuilder = uuidPattern.test(slug)
        ? queryBuilder.or(`event_slug.eq.${slug},id.eq.${slug}`)
        : queryBuilder.eq('event_slug', slug)

      const { data, error } = await queryBuilder

      if (cancelled) return

      if (error || !data || data.length === 0) {
        if (fallbackMatch) {
          setEvent(fallbackMatch)
        } else {
          setEvent(null)
          setNotFound(true)
        }
      } else {
        const grouped = groupIntoEvents(data.map(normalizeRow))
        setEvent(grouped[0] ?? null)
        if (!grouped[0]) setNotFound(true)
      }
      setLoading(false)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [slug])

  return { event, loading, notFound }
}