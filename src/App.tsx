import DotGridCanvas from './sections/DotGridCanvas'
import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import TechStack from './sections/TechStack'
import TextScrollBand from './sections/TextScrollBand'
import WebsiteShowcase from './sections/WebsiteShowcase'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import Metrics from './sections/Metrics'
import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import CustomCursor from './sections/CustomCursor'

export default function App() {
  return (
    <>
      {/* Persistent background canvas */}
      <DotGridCanvas />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="relative" style={{ zIndex: 1 }}>
        <Hero />
        <TechStack />
        <TextScrollBand />
        <WebsiteShowcase />
        <Skills />
        <Experience />
        <Metrics />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
