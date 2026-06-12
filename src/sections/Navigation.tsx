import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    gsap.fromTo(nav,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    )

    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-[100] transition-all duration-500 opacity-0"
      style={{
        background: scrolled
          ? 'rgba(247, 247, 245, 0.85)'
          : 'rgba(5, 5, 5, 0.6)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: scrolled
          ? '1px solid rgba(5,5,5,0.06)'
          : '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-[72px] flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="font-display text-[20px] font-bold tracking-[-0.6px] transition-colors duration-300"
          style={{ color: scrolled ? '#050505' : '#FFFFFF' }}
        >
          ABH
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="group relative font-body text-[14px] font-medium tracking-[-0.07px] transition-colors duration-300 hover:text-[#9EB356]"
              style={{ color: scrolled ? '#050505' : '#FFFFFF' }}
            >
              {link.label}
              <span
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-[6px] h-[6px] rounded-full bg-[#9EB356] scale-0 group-hover:scale-100 transition-transform duration-300"
                style={{ transformOrigin: 'center' }}
              />
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-5 h-[2px] transition-all duration-300"
            style={{
              backgroundColor: scrolled ? '#050505' : '#FFFFFF',
              transform: mobileOpen ? 'rotate(45deg) translate(2.5px, 2.5px)' : 'none'
            }}
          />
          <span
            className="block w-5 h-[2px] transition-all duration-300"
            style={{
              backgroundColor: scrolled ? '#050505' : '#FFFFFF',
              opacity: mobileOpen ? 0 : 1
            }}
          />
          <span
            className="block w-5 h-[2px] transition-all duration-300"
            style={{
              backgroundColor: scrolled ? '#050505' : '#FFFFFF',
              transform: mobileOpen ? 'rotate(-45deg) translate(2.5px, -2.5px)' : 'none'
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden absolute top-[72px] left-0 w-full py-6 px-6 flex flex-col gap-4"
          style={{
            background: scrolled
              ? 'rgba(247, 247, 245, 0.95)'
              : 'rgba(5, 5, 5, 0.95)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="font-body text-[16px] font-medium transition-colors duration-300 hover:text-[#9EB356]"
              style={{ color: scrolled ? '#050505' : '#FFFFFF' }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
