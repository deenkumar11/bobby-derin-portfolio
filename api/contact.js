import { createClient } from '@supabase/supabase-js'

// This runs as a Vercel serverless function (Node runtime), not in the browser,
// so it's safe to use the Supabase SERVICE ROLE key here (never expose it to the client).
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, project, message } = req.body ?? {}

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required.' })
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' })
  }

  try {
    const { error } = await supabase.from('contact_messages').insert({
      name: String(name).slice(0, 200),
      email: String(email).slice(0, 200),
      project: project ? String(project).slice(0, 200) : null,
      message: String(message).slice(0, 5000),
    })

    if (error) {
      console.error('[api/contact] Supabase insert error:', error.message)
      return res.status(500).json({ error: 'Could not save your message. Please try again shortly.' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[api/contact] Unexpected error:', err)
    return res.status(500).json({ error: 'Something went wrong. Please try again shortly.' })
  }
}
