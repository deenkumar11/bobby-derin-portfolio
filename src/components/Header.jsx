const NAV = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-bone/10 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" className="font-mono text-xs tracking-[0.25em] text-bone-dim uppercase">
          Bobby Derin
        </a>
        <nav className="hidden gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-xs uppercase tracking-[0.15em] text-bone/80 transition-colors hover:text-safelight"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="font-mono text-xs uppercase tracking-[0.15em] text-bone/80 transition-colors hover:text-safelight"
        >
          Book a shoot →
        </a>
      </div>
    </header>
  )
}
