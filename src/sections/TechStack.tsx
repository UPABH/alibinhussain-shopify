import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TECH_SKILLS = [
  {
    name: 'HTML / CSS',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 2l2 18 6 2 6-2 2-18H4z" />
        <path d="M8 7h8" />
        <path d="M9 12h6" />
        <path d="M10 17l4-5" />
      </svg>
    ),
  },
  {
    name: 'JavaScript',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <path d="M7 16v-3" />
        <path d="M12 16V9" />
        <path d="M17 16c0-2-2-2-2-4s2-2 2-4" />
      </svg>
    ),
  },
  {
    name: 'Python',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2c-3.5 0-5 2-5 4.5V9h10V6.5C17 4 15.5 2 12 2z" />
        <path d="M7 9h10v6H7z" />
        <path d="M12 22c3.5 0 5-2 5-4.5V15H7v2.5C7 20 8.5 22 12 22z" />
        <circle cx="9.5" cy="5.5" r="1" fill="currentColor" />
        <circle cx="14.5" cy="18.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <path d="M12 12V6" />
        <path d="M7 9v6" />
        <path d="M17 9v6" />
      </svg>
    ),
  },
  {
    name: 'React',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="2" />
        <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 9c2-3.5 6-4 9-1.5s6 1.5 8-1.5" />
        <path d="M4.5 18c2-3.5 6-4 9-1.5s6 1.5 8-1.5" />
      </svg>
    ),
  },
  {
    name: 'Liquid',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.8a7.5 7.5 0 1 1-11.32 0L12 2.69z" />
        <path d="M9 15c0 1.66 1.34 3 3 3s3-1.34 3-3" />
      </svg>
    ),
  },
  {
    name: 'Shopify',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 2l-2 15s-1 3 2 3h10c3 0 2-3 2-3L17 2" />
        <path d="M12 5c-3 0-4 2-4 4.5V14h8V9.5C16 7 15 5 12 5z" />
        <path d="M12 20v-6" />
      </svg>
    ),
  },
  {
    name: 'Shopify Apps',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <path d="M10 6.5h4" />
        <path d="M12 3v7" />
      </svg>
    ),
  },
  {
    name: 'Canva',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7c-2.5 0-3 2-3 4.5S10 16 12 16" />
        <path d="M12 7c2.5 0 3 2 3 4.5S14 16 12 16" />
        <path d="M12 16v3" />
      </svg>
    ),
  },
  {
    name: 'Figma',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 12a3.5 3.5 0 1 0 0-7H8.5a3.5 3.5 0 0 0 0 7H12z" />
        <path d="M12 12a3.5 3.5 0 1 1 0 7H8.5a3.5 3.5 0 0 1 0-7H12z" />
        <path d="M8.5 16.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
        <path d="M8.5 2v5" />
        <path d="M8.5 16.5V22" />
      </svg>
    ),
  },
  {
    name: 'SEO',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35" />
        <path d="M8 13l2.5-2.5L13 13" />
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c-4 0-6 2-6 5v8c0 2 1 4 4 4h1v3l3-3h1c3 0 4-2 4-4V8c0-3-2-5-6-5z" />
        <circle cx="10" cy="9" r="1.5" fill="currentColor" />
        <path d="M8 17c1.5 1 4.5 1 6 0" />
      </svg>
    ),
  },
  {
    name: 'MongoDB',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2c1.5 3.5 2 7.5 2 11 0 4-1.5 8-2 9-.5-1-2-5-2-9 0-3.5.5-7.5 2-11z" />
        <path d="M12 22v-3" />
      </svg>
    ),
  },
  {
    name: 'Database',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v10c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
        <path d="M4 10c0 1.7 3.6 3 8 3s8-1.3 8-3" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    name: 'Cursor AI',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3l7.5 17.5 2.5-7.5 7.5-2.5L3 3z" />
        <path d="M18 9l-2-2" />
        <path d="M20 7l-4-4" />
      </svg>
    ),
  },
  {
    name: 'Odoo',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="12" r="4" />
        <circle cx="18" cy="12" r="4" />
        <path d="M10 12h4" />
      </svg>
    ),
  },
]

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const header = headerRef.current
    const grid = gridRef.current
    if (!section || !header || !grid) return

    const ctx = gsap.context(() => {
      gsap.fromTo(header,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          },
        }
      )

      const items = grid.querySelectorAll('.tech-item')
      gsap.fromTo(items,
        { y: 50, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="tech-stack"
      ref={sectionRef}
      className="relative py-20 md:py-[120px] overflow-hidden"
      style={{ background: '#050505', zIndex: 1 }}
    >
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#9EB356]/30 to-transparent" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headerRef} className="opacity-0 text-center mb-14 md:mb-20">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="w-[1px] h-5 bg-[#9EB356]" />
            <span className="text-label text-[#8A8A8A]">Core Technologies</span>
            <div className="w-[1px] h-5 bg-[#9EB356]" />
          </div>
          <h2 className="font-display text-[clamp(36px,4vw,56px)] font-bold tracking-[-1.2px] text-white leading-[1.05] mb-5">
            TECH ARSENAL
          </h2>
          <p className="font-body text-[16px] md:text-[18px] text-[#8A8A8A] max-w-[560px] mx-auto leading-[1.6]">
            A curated stack of languages, frameworks, and platforms I use to design, build, and scale modern digital experiences.
          </p>
        </div>

        {/* Skills Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5"
        >
          {TECH_SKILLS.map((skill) => (
            <div
              key={skill.name}
              className="tech-item group relative flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-7 transition-all duration-400 hover:-translate-y-1 hover:border-[#9EB356]/40 hover:bg-white/[0.05] hover:shadow-[0_0_40px_rgba(158,179,86,0.12)] opacity-0"
            >
              {/* Glow dot */}
              <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-[#9EB356]/40 group-hover:bg-[#9EB356] transition-colors duration-300" />

              {/* Icon */}
              <div className="text-[#9EB356] transition-transform duration-400 group-hover:scale-110 group-hover:rotate-[-4deg]">
                {skill.icon}
              </div>

              {/* Name */}
              <span className="font-body text-[13px] md:text-[14px] font-medium text-white/90 text-center tracking-[-0.2px] group-hover:text-white transition-colors duration-300">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
