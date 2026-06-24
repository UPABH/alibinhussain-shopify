import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TIMELINE_ENTRIES = [
  {
    company: 'Studio Ojo',
    role: 'Full Stack Developer',
    period: 'Feb 2026 – Present',
    description: 'Handling 5+ Shopify Plus stores. Custom theme development, high-converting product pages, seamless app & API integrations.',
  },
  {
    company: 'Lukuku',
    role: 'Shopify Team Lead',
    period: 'Jul 2023 – Feb 2026',
    description: 'Led global Shopify development team. Delivered enterprise-level Korean and international eCommerce stores. Managed 3-5 concurrent projects.',
  },
  {
    company: 'Ginkgo Retail',
    role: 'Software Engineer (React)',
    period: 'Feb 2023 – Jul 2023',
    description: 'Developed frontend interfaces using React JS. Integrated complex Shopify APIs. Built reusable components.',
  },
  {
    company: 'Epinovus',
    role: 'Senior Shopify Developer',
    period: 'Jun 2022 – Jul 2023',
    description: 'Developed and customized Shopify themes for leading fashion and retail brands. Optimized store speed and UX.',
  },
  {
    company: 'Alchemative',
    role: 'Shopify Developer',
    period: 'Jan 2021 – May 2022',
    description: 'Built and customized Shopify stores. Worked with major Pakistani fashion brands. Progressed to senior-level capabilities.',
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const entriesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    const entries = entriesRef.current
    if (!section || !title || !entries) return

    const ctx = gsap.context(() => {
      gsap.fromTo(title,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          }
        }
      )

      const entryEls = entries.querySelectorAll('.timeline-entry')
      entryEls.forEach((el, i) => {
        const fromX = i % 2 === 0 ? -60 : 60
        gsap.fromTo(el,
          { x: fromX, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            }
          }
        )
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-20 md:py-[120px]"
      style={{ background: '#050505', zIndex: 1 }}
    >
      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        <h2
          ref={titleRef}
          className="font-display text-[clamp(48px,8vw,96px)] font-bold tracking-[-2.88px] uppercase text-white text-center mb-16 md:mb-20 opacity-0"
        >
          WORK EXPERIENCE
        </h2>

        {/* Timeline */}
        <div ref={entriesRef} className="relative">
          {/* Center line */}
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 md:-translate-x-1/2"
          />

          {TIMELINE_ENTRIES.map((entry, index) => (
            <div
              key={entry.company}
              className="timeline-entry relative pl-12 md:pl-0 pb-12 md:pb-16 last:pb-0 opacity-0"
            >
              {/* Dot */}
              <div
                className="absolute left-[10px] md:left-1/2 top-1 w-3 h-3 rounded-full bg-[#9EB356] md:-translate-x-1/2"
              />

              {/* Content */}
              <div
                className={`md:w-[calc(50%-32px)] ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-0 md:text-right' : 'md:ml-auto md:pl-0'
                }`}
              >
                <span className="text-label text-[#9EB356] block mb-1">
                  {entry.period}
                </span>
                <h3 className="font-display text-[24px] md:text-[28px] font-bold text-white tracking-[-0.5px] mb-1">
                  {entry.company}
                </h3>
                <p className="font-body text-[16px] text-[#8A8A8A] mb-3">
                  {entry.role}
                </p>
                <p className="font-body text-[14px] text-white/60 leading-[1.6]">
                  {entry.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
