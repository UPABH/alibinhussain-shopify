import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    const ctx = gsap.context(() => {
      gsap.fromTo(footer,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: footer,
            start: 'top 95%',
          }
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      className="relative py-8 opacity-0"
      style={{
        background: '#050505',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        zIndex: 1,
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-body text-[13px] text-[#8A8A8A]">
          &copy; 2026 Ali Bin Hussain. All rights reserved.
        </p>

        <p className="font-mono text-[11px] uppercase text-white/20 tracking-[0.5px]">
          Built with React &amp; GSAP
        </p>

        <a
          href="/ALI BIN HUSSAIN CV.pdf"
          download
          className="font-body text-[13px] font-medium text-[#9EB356] hover:underline transition-all duration-300"
        >
          Download CV
        </a>
      </div>
    </footer>
  )
}
