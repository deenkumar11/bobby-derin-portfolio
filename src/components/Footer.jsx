export default function Footer() {
  return (
    <footer className="border-t border-bone/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 font-mono text-xs uppercase tracking-widest text-bone-dim md:flex-row md:items-center md:justify-between md:px-10">
        <p>© {new Date().getFullYear()} Bobby Derin</p>
        <div className="flex gap-6">
          <a href="https://instagram.com" className="hover:text-safelight" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://behance.net" className="hover:text-safelight" target="_blank" rel="noreferrer">Behance</a>
          <a href="mailto:hello@bobbyderin.com" className="hover:text-safelight">Email</a>
        </div>
      </div>
    </footer>
  )
}
