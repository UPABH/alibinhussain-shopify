import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ROW1_TEXT = 'SHOPIFY EXPERT \u2022 CUSTOM THEMES \u2022 PERFORMANCE OPTIMIZATION \u2022 80+ STORES DELIVERED \u2022 LIQUID \u2022 REACT \u2022 '
const ROW2_TEXT = 'GLOBAL CLIENTS \u2022 KOREA \u2022 USA \u2022 EUROPE \u2022 PAKISTAN \u2022 SCALABLE STOREFRONTS \u2022 '

export default function TextScrollBand() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(section,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          }
        }
      )
    })

    return () => ctx.revert()
  }, [])

  const repeatText = (text: string, times: number) => {
    return Array(times).fill(text).join('')
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden opacity-0"
      style={{
        background: '#F7F7F5',
        zIndex: 1,
        borderTop: '1px solid rgba(5,5,5,0.1)',
        borderBottom: '1px solid rgba(5,5,5,0.1)',
      }}
    >
      {/* Row 1 - scrolls left */}
      <div className="py-6 md:py-8 overflow-hidden">
        <div className="scroll-band-row animate-scroll-left">
          <span className="scroll-band-text text-[#050505]">
            {repeatText(ROW1_TEXT, 3)}
          </span>
          <span className="scroll-band-text text-[#050505]">
            {repeatText(ROW1_TEXT, 3)}
          </span>
          <span className="scroll-band-text text-[#050505]">
            {repeatText(ROW1_TEXT, 3)}
          </span>
        </div>
      </div>

      {/* Row 2 - scrolls right */}
      <div className="pb-6 md:pb-8 overflow-hidden">
        <div className="scroll-band-row animate-scroll-right">
          <span className="scroll-band-text" style={{ color: 'rgba(5,5,5,0.08)' }}>
            {repeatText(ROW2_TEXT, 3)}
          </span>
          <span className="scroll-band-text" style={{ color: 'rgba(5,5,5,0.08)' }}>
            {repeatText(ROW2_TEXT, 3)}
          </span>
          <span className="scroll-band-text" style={{ color: 'rgba(5,5,5,0.08)' }}>
            {repeatText(ROW2_TEXT, 3)}
          </span>
        </div>
      </div>
    </section>
  )
}
