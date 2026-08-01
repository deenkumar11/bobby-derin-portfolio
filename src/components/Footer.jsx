export default function Footer() {
  return (
    <footer className="border-t border-bone/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 font-mono text-xs uppercase tracking-widest text-bone-dim md:flex-row md:items-center md:justify-between md:px-10">
        <p>© {new Date().getFullYear()} Bobby Derin</p>
        <div className="flex gap-6">
          <a href="https://www.instagram.com/bobby_derin/" className="hover:text-safelight" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.linkedin.com/in/bobby-derin-a3b6b11b1/" className="hover:text-safelight" target="_blank" rel="noreferrer ">LinkedIN</a>
        </div>
      </div>
    </footer>
  )
}
