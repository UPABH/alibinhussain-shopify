import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const METRICS = [
  { value: 80, suffix: '+', label: 'Stores Delivered Globally' },
  { value: 30, suffix: '+', label: 'Stores Built From Scratch' },
  { value: 5, suffix: '+', label: 'Years of Experience' },
  { value: 50, suffix: '+', label: 'Successful Store Launches' },
]

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        if (hasAnimated) return
        setHasAnimated(true)

        // Spring scale animation first
        gsap.fromTo(el,
          { scale: 0.5, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
        )

        // Counter animation
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 2.5,
          ease: 'power2.out',
          snap: { val: 1 },
          onUpdate: () => {
            setCount(Math.round(obj.val))
          },
        })
      },
    })

    return () => trigger.kill()
  }, [target, hasAnimated])

  return (
    <div ref={ref} className="text-center opacity-0">
      <span className="font-display text-[clamp(60px,10vw,120px)] font-bold tracking-[-3.6px] text-[#050505] leading-[1.0]">
        {count}{suffix}
      </span>
      <p className="text-label text-[#8A8A8A] mt-2">
        {METRICS.find(m => m.value === target)?.label}
      </p>
    </div>
  )
}

export default function Metrics() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-[120px]"
      style={{ background: '#F7F7F5', zIndex: 1 }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#9EB356]" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {METRICS.map((metric) => (
            <AnimatedCounter
              key={metric.label}
              target={metric.value}
              suffix={metric.suffix}
            />
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#9EB356]" />
    </section>
  )
}
