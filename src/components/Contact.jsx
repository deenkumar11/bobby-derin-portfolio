import { useState } from 'react'

const INITIAL = { name: '', email: '', project: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(INITIAL)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('')

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Something went wrong sending your message.')
      setStatus('sent')
      setForm(INITIAL)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message)
    }
  }

  return (
    <section id="contact" className="border-t border-bone/10 bg-ink-soft">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-safelight">Contact</p>
            <h2 className="mt-4 font-display text-3xl font-700 leading-tight md:text-4xl">
              Have a shoot in mind?
            </h2>
            <p className="mt-4 text-bone/70">
              Tell me a bit about the project and I'll get back to you within a couple of days.
            </p>
            <div className="mt-8 space-y-1 font-mono text-sm text-bone-dim">
              <p>derinbobby05@gmail.com</p>
              <p>Chennai, Tamil Nadu, India</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="md:col-span-7 md:col-start-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="font-mono text-xs uppercase tracking-widest text-bone-dim">Name</label>
                <input
                  id="name" required value={form.name} onChange={update('name')}
                  className="mt-2 w-full border-b border-bone/20 bg-transparent py-2 text-bone outline-none focus:border-safelight"
                />
              </div>
              <div>
                <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-bone-dim">Email</label>
                <input
                  id="email" type="email" required value={form.email} onChange={update('email')}
                  className="mt-2 w-full border-b border-bone/20 bg-transparent py-2 text-bone outline-none focus:border-safelight"
                />
              </div>
            </div>
            <div>
              <label htmlFor="project" className="font-mono text-xs uppercase tracking-widest text-bone-dim">Project type</label>
              <input
                id="project" value={form.project} onChange={update('project')}
                placeholder="Photography, video, design..."
                className="mt-2 w-full border-b border-bone/20 bg-transparent py-2 text-bone outline-none placeholder:text-bone-dim/50 focus:border-safelight"
              />
            </div>
            <div>
              <label htmlFor="message" className="font-mono text-xs uppercase tracking-widest text-bone-dim">Message</label>
              <textarea
                id="message" required rows={4} value={form.message} onChange={update('message')}
                className="mt-2 w-full border-b border-bone/20 bg-transparent py-2 text-bone outline-none focus:border-safelight"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex items-center gap-2 bg-safelight px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>

            {status === 'sent' && (
              <p className="font-mono text-xs uppercase tracking-widest text-safelight">Message sent — thank you.</p>
            )}
            {status === 'error' && (
              <p className="font-mono text-xs uppercase tracking-widest text-red-400">{errorMsg}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
