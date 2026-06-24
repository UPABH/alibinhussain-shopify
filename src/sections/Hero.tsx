import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // Label
    tl.fromTo(labelRef.current,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
      0.4
    )

    // H1 Line 1
    tl.fromTo(line1Ref.current,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 1.5, ease: 'expo.inOut' },
      0.6
    )

    // H1 Line 2
    tl.fromTo(line2Ref.current,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 1.5, ease: 'expo.inOut' },
      0.72
    )

    // Subtitle
    tl.fromTo(subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out' },
      1.2
    )

    // CTA
    tl.fromTo(ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      1.4
    )

    // Portrait
    tl.fromTo(portraitRef.current,
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.4, ease: 'power3.out' },
      1.0
    )

    // Liquid glass card
    tl.fromTo(cardRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.0, ease: 'back.out(1.2)' },
      1.6
    )

    return () => { tl.kill() }
  }, [])



  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] overflow-hidden flex items-center"
      style={{ background: '#050505', zIndex: 1 }}
    >
      {/* Text content - left side */}
      <div className="relative z-10 w-full md:w-[55%] px-6 md:px-0 md:pl-[8vw] py-20 md:py-0">
        {/* Label */}
        <div ref={labelRef} className="opacity-0 flex items-start gap-3 mb-8">
          <div className="w-[1px] h-10 bg-[#9EB356] mt-0.5" />
          <div className="flex flex-col gap-0.5">
            <span className="text-label text-[#8A8A8A]">SENIOR SHOPIFY DEVELOPER</span>
            <span className="text-label text-[#8A8A8A]">FULL STACK DEVELOPER</span>
          </div>
        </div>

        {/* H1 */}
        <h1 className="mb-8">
          <div
            ref={line1Ref}
            className="font-display text-[clamp(48px,10vw,120px)] font-bold leading-[1.0] tracking-[-3.6px] uppercase text-white"
            style={{ clipPath: 'inset(0 100% 0 0)' }}
          >
            ALI BIN
          </div>
          <div
            ref={line2Ref}
            className="font-display text-[clamp(48px,10vw,120px)] font-bold leading-[1.0] tracking-[-3.6px] uppercase text-white"
            style={{ clipPath: 'inset(0 100% 0 0)' }}
          >
            HUSSAIN
          </div>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-body text-[16px] md:text-[18px] text-[#8A8A8A] max-w-[480px] mb-10 opacity-0"
        >
          5+ Years | 80+ Global Stores | Custom Themes &amp; Performance
        </p>

        {/* CTA */}
        <a
          ref={ctaRef}
          href="/ALI BIN HUSSAIN CV.pdf"
          download
          className="inline-block font-body text-[14px] font-semibold px-9 py-[14px] rounded-full transition-all duration-300 hover:scale-[1.04] opacity-0"
          style={{
            background: '#9EB356',
            color: '#050505',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#C8D69C'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#9EB356'
          }}
        >
          Download CV
        </a>
      </div>

      {/* Portrait - right side */}
      <div
        ref={portraitRef}
        className="hidden md:block absolute right-0 top-0 w-[45%] h-full opacity-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/portrait.png)',
            objectPosition: 'center top',
          }}
        />
        {/* Gradient overlay from left */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, #050505 0%, transparent 30%)',
          }}
        />
      </div>

      {/* Mobile portrait */}
      <div className="md:hidden absolute inset-0 z-0 opacity-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/portrait.png)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, #050505 0%, transparent 50%, #050505 100%)' }}
        />
      </div>

      {/* Liquid Glass Card */}
      <div
        ref={cardRef}
        className="liquid-glass absolute bottom-12 md:bottom-20 right-6 md:right-[8vw] z-10 rounded-3xl opacity-0 hidden sm:block"
        style={{
          width: 'clamp(280px, 30vw, 360px)',
          padding: '32px',
          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.3)',
        }}
      >
        <span className="text-label text-[11px] text-[#8A8A8A] block mb-3">
          Available for Projects
        </span>
        <p className="font-display text-[clamp(20px,2.5vw,28px)] font-bold text-white leading-[1.2] mb-4">
          Let's build something extraordinary
        </p>
        <div className="w-full h-[1px] bg-white/10 mb-4" />
        <a
          href="mailto:alibinhussain6363@gmail.com"
          className="font-body text-[13px] text-[#9EB356] hover:text-[#C8D69C] transition-colors duration-300 break-all"
        >
          alibinhussain6363@gmail.com
        </a>
      </div>
    </section>
  )
}
