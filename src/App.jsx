import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import WorkGrid from './components/WorkGrid'
import About from './components/About'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import EventPage from './components/EventPage'

function Home() {
  return (
    <>
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
    </>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-ink text-bone">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:slug" element={<EventPage />} />
      </Routes>
    </div>
  )
}
