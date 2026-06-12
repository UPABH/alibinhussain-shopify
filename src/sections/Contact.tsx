import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const left = leftRef.current
    const right = rightRef.current
    if (!section || !left || !right) return

    const ctx = gsap.context(() => {
      const leftLines = left.querySelectorAll('.cta-line')
      gsap.fromTo(leftLines,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          }
        }
      )

      const rightItems = right.querySelectorAll('.contact-item')
      gsap.fromTo(rightItems,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          }
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 md:pt-[160px] md:pb-20"
      style={{ background: '#050505', zIndex: 1 }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-16 md:gap-8">
          {/* Left column */}
          <div ref={leftRef} className="md:w-[50%]">
            <div className="cta-line font-display text-[clamp(48px,7vw,96px)] font-bold tracking-[-2.88px] uppercase text-white leading-[1.0] opacity-0">
              LET'S BUILD
            </div>
            <div className="cta-line font-display text-[clamp(48px,7vw,96px)] font-bold tracking-[-2.88px] uppercase text-white leading-[1.0] opacity-0">
              SOMETHING
            </div>
            <div className="cta-line font-display text-[clamp(48px,7vw,96px)] font-bold tracking-[-2.88px] uppercase leading-[1.0] opacity-0" style={{ color: '#9EB356' }}>
              GREAT.
            </div>
            <p className="cta-line font-body text-[16px] text-[#8A8A8A] mt-8 max-w-[400px] opacity-0">
              Available for full-time roles, freelance projects, and consulting.
            </p>
          </div>

          {/* Right column */}
          <div ref={rightRef} className="md:w-[50%] flex flex-col justify-end">
            <div className="contact-item opacity-0">
              <span className="text-label text-[#8A8A8A] block mb-2">Email</span>
              <a
                href="mailto:alibinhussain6363@gmail.com"
                className="font-body text-[20px] md:text-[24px] font-medium text-white hover:text-[#9EB356] transition-colors duration-300 break-all"
              >
                alibinhussain6363@gmail.com
              </a>
            </div>

            <div className="w-full h-[1px] bg-white/10 my-6" />

            <div className="contact-item opacity-0">
              <span className="text-label text-[#8A8A8A] block mb-2">LinkedIn</span>
              <a
                href="https://linkedin.com/in/ali-hussain-10a026182"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-[16px] md:text-[18px] text-white hover:text-[#9EB356] transition-colors duration-300 break-all"
              >
                linkedin.com/in/ali-hussain-10a026182
              </a>
            </div>

            <div className="w-full h-[1px] bg-white/10 my-6" />

            <div className="contact-item opacity-0">
              <span className="text-label text-[#8A8A8A] block mb-2">Phone</span>
              <a
                href="tel:+923044010669"
                className="font-body text-[16px] md:text-[18px] text-white hover:text-[#9EB356] transition-colors duration-300"
              >
                +92 304 4010669
              </a>
            </div>

            <div className="w-full h-[1px] bg-white/10 my-6" />

            <div className="contact-item opacity-0">
              <span className="text-label text-[#8A8A8A] block mb-2">Location</span>
              <p className="font-body text-[16px] md:text-[18px] text-white">
                Lahore, Pakistan | Remote Worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
