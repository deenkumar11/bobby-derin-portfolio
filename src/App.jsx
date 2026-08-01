import Header from './components/Header'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import WorkGrid from './components/WorkGrid'
import About from './components/About'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-ink text-bone">
      <Header />
      <main>
        <Hero />
        <Marquee />
        <WorkGrid />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}