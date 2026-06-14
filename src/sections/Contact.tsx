import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Copy, Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = value
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="ml-3 p-2 rounded-full border border-white/10 text-white/50 hover:text-[#9EB356] hover:border-[#9EB356]/50 transition-all duration-300 shrink-0"
      aria-label={`Copy ${value}`}
      title="Copy"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  )
}

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

  const email = 'alibinhussain6363@gmail.com'
  const linkedIn = 'https://linkedin.com/in/ali-hussain-10a026182'
  const portfolio = 'https://drive.google.com/drive/folders/1J6J2HYjEX44uXurYqi-a15yQgUkpx9aO?usp=sharing'
  const phone = '+92 304 4010669'
  const whatsappNumber = '923044010669'

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
              <div className="flex items-center">
                <a
                  href={`mailto:${email}`}
                  onClick={(e) => {
                    e.preventDefault()
                    window.open(`mailto:${email}`, '_blank')
                  }}
                  className="font-body text-[20px] md:text-[24px] font-medium text-white hover:text-[#9EB356] transition-colors duration-300 break-all"
                >
                  {email}
                </a>
                <CopyButton value={email} />
              </div>
            </div>

            <div className="w-full h-[1px] bg-white/10 my-6" />

            <div className="contact-item opacity-0">
              <span className="text-label text-[#8A8A8A] block mb-2">LinkedIn</span>
              <div className="flex items-center">
                <a
                  href={linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[16px] md:text-[18px] text-white hover:text-[#9EB356] transition-colors duration-300 break-all"
                >
                  linkedin.com/in/ali-hussain-10a026182
                </a>
                <CopyButton value={linkedIn} />
              </div>
            </div>

            <div className="w-full h-[1px] bg-white/10 my-6" />

            <div className="contact-item opacity-0">
              <span className="text-label text-[#8A8A8A] block mb-2">Portfolio</span>
              <div className="flex items-center">
                <a
                  href={portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[16px] md:text-[18px] text-white hover:text-[#9EB356] transition-colors duration-300 break-all"
                >
                  checkout portfolio
                </a>
                <CopyButton value={portfolio} />
              </div>
            </div>

            <div className="w-full h-[1px] bg-white/10 my-6" />

            <div className="contact-item opacity-0">
              <span className="text-label text-[#8A8A8A] block mb-2">Phone</span>
              <div className="flex items-center">
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[16px] md:text-[18px] text-white hover:text-[#9EB356] transition-colors duration-300"
                  title="Open WhatsApp"
                >
                  {phone}
                </a>
                <CopyButton value={phone} />
              </div>
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
