import { useEffect, useState } from 'react'
import { supabase, publicUrlFor } from './supabaseClient'

// Fallback data so the site still looks complete before Supabase is wired up
// or if a query fails. Replace by inserting rows into the `work_items` table.
const FALLBACK_WORK = [
  {
    id: 'fallback-1',
    title: 'Harbour Line, Chennai',
    medium: 'photography',
    category: 'Editorial',
    year: 2025,
    camera: 'Sony A7IV · 35mm · f/2.8 · 1/250s · ISO 400',
    image_path: null,
    fallback_url: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'fallback-2',
    title: 'Monsoon Portraits',
    medium: 'photography',
    category: 'Portrait',
    year: 2025,
    camera: 'Sony A7IV · 85mm · f/1.8 · 1/500s · ISO 200',
    image_path: null,
    fallback_url: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'fallback-3',
    title: 'Nightfall — Short Film',
    medium: 'videography',
    category: 'Direction',
    year: 2024,
    camera: 'FX3 · 24fps · Log3',
    image_path: null,
    fallback_url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'fallback-4',
    title: 'Anchor Coffee — Brand Identity',
    medium: 'design',
    category: 'Branding',
    year: 2024,
    camera: 'Figma · CMYK · Letterpress stock',
    image_path: null,
    fallback_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'fallback-5',
    title: 'Field Notes',
    medium: 'photography',
    category: 'Landscape',
    year: 2024,
    camera: 'Sony A7IV · 24mm · f/8 · 1/125s · ISO 100',
    image_path: null,
    fallback_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'fallback-6',
    title: 'Salt & Light — Music Video',
    medium: 'videography',
    category: 'Cinematography',
    year: 2024,
    camera: 'FX3 · 24fps · Anamorphic',
    image_path: null,
    fallback_url: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1200&auto=format&fit=crop',
  },
]

export function useWork(medium = 'all') {
  const [items, setItems] = useState(FALLBACK_WORK)
  const [loading, setLoading] = useState(true)
  const [usingFallback, setUsingFallback] = useState(true)

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
        if (error) console.warn('[useWork] falling back to sample data:', error.message)
        setItems(medium === 'all' ? FALLBACK_WORK : FALLBACK_WORK.filter((w) => w.medium === medium))
        setUsingFallback(true)
      } else {
        setItems(
          data.map((row) => ({
            ...row,
            fallback_url: publicUrlFor(row.image_path),
          }))
        )
        setUsingFallback(false)
      }
      setLoading(false)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [medium])

  return { items, loading, usingFallback }
}
