import { useRef, useEffect, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    id: 1,
    name: 'Wilson Korea',
    url: 'kr.wilson.com',
    image: '/project-4.jpg',
    description: 'Global sports brand localized for Korean market with Shopify Plus architecture.',
    tags: ['Shopify Plus', 'Localization', 'React'],
  },
  {
    id: 2,
    name: 'Stand Oil Japan',
    url: 'standoil.jp',
    image: '/project-3.jpg',
    description: 'Premium Korean cosmetics brand — Japanese storefront with custom theme.',
    tags: ['Shopify Plus', 'Custom Theme', 'Multi-language'],
  },
  {
    id: 3,
    name: 'ADRO Global',
    url: 'global.adro.com',
    image: '/project-1.jpg',
    description: 'Athletic wear brand — multi-region Shopify Plus with 5+ stores.',
    tags: ['Shopify Plus', 'Multi-region', 'Performance'],
  },
  {
    id: 4,
    name: 'Wishtrend',
    url: 'wishtrend.com',
    image: '/project-2.jpg',
    description: 'K-beauty e-commerce with complex app integrations and custom functionality.',
    tags: ['Shopify', 'App Integrations', 'API'],
  },
  {
    id: 5,
    name: 'BenZamin AI',
    url: 'benzamin.ai',
    image: '/project-5.jpg',
    description: 'AI-powered skincare personalization platform with recommendation engine.',
    tags: ['Shopify', 'AI Integration', 'Custom App'],
  },
]

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null)
  const rotationRef = useRef(0)
  const autoRotateRef = useRef<number>(0)
  const isDraggingRef = useRef(false)

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    if (!section || !heading) return

    const ctx = gsap.context(() => {
      gsap.fromTo(heading,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          }
        }
      )

      gsap.fromTo(carouselRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.0,
          delay: 0.3,
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          }
        }
      )
    })

    return () => ctx.revert()
  }, [])

  // Auto-rotate carousel
  useEffect(() => {
    let lastTime = performance.now()

    const animate = (now: number) => {
      if (!isDraggingRef.current) {
        const dt = now - lastTime
        rotationRef.current += dt * 0.015
        setActiveIndex(Math.round((rotationRef.current % 360) / (360 / PROJECTS.length)) % PROJECTS.length)
      }
      lastTime = now
      autoRotateRef.current = requestAnimationFrame(animate)
    }

    autoRotateRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(autoRotateRef.current)
  }, [])

  const handlePrev = useCallback(() => {
    rotationRef.current -= (360 / PROJECTS.length)
  }, [])

  const handleNext = useCallback(() => {
    rotationRef.current += (360 / PROJECTS.length)
  }, [])

  const getCardStyle = (index: number) => {
    const anglePerCard = 360 / PROJECTS.length
    const angle = (index * anglePerCard - rotationRef.current) * (Math.PI / 180)
    const radius = 320

    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius
    const brightness = (z + radius) / (2 * radius) * 0.7 + 0.3

    return {
      transform: `translateX(${x}px) translateZ(${z}px) rotateY(${-index * anglePerCard + rotationRef.current}deg)`,
      opacity: brightness,
      zIndex: Math.round(z + radius),
    }
  }

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-20 md:py-[120px] overflow-hidden"
      style={{ background: '#050505', zIndex: 1 }}
    >
      {/* Heading */}
      <div ref={headingRef} className="max-w-[1440px] mx-auto px-6 md:px-12 mb-12 md:mb-16 opacity-0">
        <h2 className="font-display text-[clamp(48px,8vw,96px)] font-bold tracking-[-2.88px] uppercase text-white leading-[1.0]">
          SELECTED WORK
        </h2>
        <p className="font-body text-[16px] text-[#8A8A8A] max-w-[400px] mt-4">
          A few highlights from 80+ stores delivered across 5 continents.
        </p>
      </div>

      {/* 3D Carousel */}
      <div
        ref={carouselRef}
        className="relative h-[400px] md:h-[500px] flex items-center justify-center opacity-0"
        style={{ perspective: '1000px' }}
      >
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              className="absolute cursor-pointer transition-none"
              style={{
                width: 'clamp(260px, 30vw, 340px)',
                height: 'clamp(340px, 40vw, 440px)',
                ...getCardStyle(index),
              }}
              onClick={() => setSelectedProject(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') setSelectedProject(project) }}
            >
              <div
                className="w-full h-full rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 hover:border-[#9EB356]/50 hover:shadow-[0_0_40px_rgba(158,179,86,0.15)]"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-[70%] object-cover"
                  loading="lazy"
                />
                <div className="p-4 md:p-5">
                  <h3 className="font-display text-[18px] md:text-[22px] font-bold text-white tracking-[-0.5px]">
                    {project.name}
                  </h3>
                  <p className="font-mono text-[11px] uppercase text-[#9EB356] mt-1 tracking-[0.5px]">
                    {project.url}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-colors duration-300 hover:border-[#9EB356] z-10"
          aria-label="Previous project"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.5">
            <path d="M10 3L5 8L10 13" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-colors duration-300 hover:border-[#9EB356] z-10"
          aria-label="Next project"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.5">
            <path d="M6 3L11 8L6 13" />
          </svg>
        </button>
      </div>

      {/* Active project indicator dots */}
      <div className="flex justify-center gap-2 mt-6">
        {PROJECTS.map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              background: i === Math.abs(activeIndex) % PROJECTS.length ? '#9EB356' : 'rgba(255,255,255,0.2)',
              transform: i === Math.abs(activeIndex) % PROJECTS.length ? 'scale(1.3)' : 'scale(1)',
            }}
          />
        ))}
      </div>

      {/* Project Detail Overlay */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-end"
          onClick={() => setSelectedProject(null)}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="liquid-glass relative w-full md:w-[80%] lg:w-[60%] h-full md:h-auto md:max-h-[90vh] md:rounded-l-3xl overflow-y-auto"
            style={{
              animation: 'slideInRight 0.5s ease forwards',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1), -8px 0 32px rgba(0,0,0,0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#9EB356] transition-colors z-10"
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 3L13 13M13 3L3 13" />
              </svg>
            </button>

            <div className="p-8 md:p-12">
              <img
                src={selectedProject.image}
                alt={selectedProject.name}
                className="w-full rounded-2xl mb-8 object-cover"
                style={{ maxHeight: '400px' }}
              />
              <h3 className="font-display text-[36px] md:text-[48px] font-bold text-white tracking-[-1px] mb-2">
                {selectedProject.name}
              </h3>
              <a
                href={`https://${selectedProject.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[13px] uppercase text-[#9EB356] hover:text-[#C8D69C] transition-colors inline-flex items-center gap-2 mb-6"
              >
                {selectedProject.url}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 12L12 4M12 4H6M12 4V10" />
                </svg>
              </a>
              <p className="font-body text-[16px] text-[#8A8A8A] leading-[1.6] mb-6">
                {selectedProject.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] uppercase tracking-[0.5px] px-3 py-1.5 rounded-full border border-white/10 text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </section>
  )
}
