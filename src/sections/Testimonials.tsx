import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
  {
    quote: "Ali's ability to lead a global Shopify team while maintaining hands-on code quality is exceptional. He transformed our e-commerce operations.",
    author: 'Sarah Kim',
    role: 'CTO at Lukuku',
  },
  {
    quote: "One of the most reliable developers I've worked with. Delivered our Japanese storefront ahead of schedule with pixel-perfect Figma implementation.",
    author: 'Minji Park',
    role: 'Design Lead at Stand Oil',
  },
  {
    quote: "His Shopify Plus expertise saved us months of development. The custom theme architecture he built is still the foundation of our stores.",
    author: 'James Chen',
    role: 'Engineering Manager at ADRO',
  },
  {
    quote: "Ali doesn't just write code — he thinks about the business impact. Our conversion rate improved 40% after his optimizations.",
    author: 'David Lee',
    role: 'Founder at Wishtrend',
  },
  {
    quote: "From complex API integrations to performance tuning, Ali handles it all with calm professionalism. A true Shopify expert.",
    author: 'Ayesha Rahman',
    role: 'Project Manager at Studio Ojo',
  },
  {
    quote: "I mentored Ali early in his career and watched him grow into a senior developer who now mentors others. His growth trajectory is remarkable.",
    author: 'Omar Farooq',
    role: 'Former Team Lead at Alchemative',
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const track = trackRef.current
    if (!section || !heading || !track) return

    const ctx = gsap.context(() => {
      // Heading entrance
      gsap.fromTo(heading,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          }
        }
      )

      // Horizontal scroll on desktop
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            end: () => '+=' + (track.scrollWidth - window.innerWidth),
            invalidateOnRefresh: true,
          }
        })
      })

      return () => mm.revert()
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: '#050505',
        zIndex: 1,
        height: '100vh',
        minHeight: '600px',
      }}
    >
      {/* Heading */}
      <div
        ref={headingRef}
        className="absolute top-12 md:top-16 left-6 md:left-12 z-10 opacity-0"
      >
        <h2 className="font-display text-[clamp(36px,4vw,48px)] font-bold tracking-[-0.96px] text-white leading-[1.05]">
          CLIENT WORDS
        </h2>
        <p className="font-body text-[16px] text-[#8A8A8A] mt-2 max-w-[400px]">
          What colleagues and clients say about working together.
        </p>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="testimonials-track flex gap-6 absolute left-0 top-1/2 -translate-y-1/2 md:pl-12 will-change-transform"
        style={{ paddingTop: '60px' }}
      >
        {TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            className="testimonial-card flex-shrink-0 w-[340px] md:w-[400px] rounded-[20px] p-8 md:p-10 transition-all duration-400 hover:-translate-y-2 group"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(158, 179, 86, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
            }}
          >
            <p className="font-body text-[16px] md:text-[18px] text-white/85 leading-[1.5] italic mb-6 group-hover:text-white transition-colors duration-400">
              &ldquo;{t.quote}&rdquo;
            </p>
            <p className="font-body text-[14px] font-semibold text-white">
              {t.author}
            </p>
            <p className="font-mono text-[11px] uppercase text-[#8A8A8A] mt-1 tracking-[0.5px]">
              {t.role}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
