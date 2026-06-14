import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from '@/components/ui/carousel'
import showcaseData from '@/data/showcase.json'

gsap.registerPlugin(ScrollTrigger)

type Website = {
  id: number
  title: string
  url: string
  tags: string[]
  preview?: string
}

// Use locally captured screenshots for reliability. If a preview image is missing,
// the component falls back to a Microlink screenshot URL, then a placeholder.
const WEBSITES: Website[] = showcaseData.map((site) => ({
  ...site,
  preview: `/showcase/${site.id}.jpg`,
}))

// Group websites into slides of 6
const SLIDES = WEBSITES.reduce<Website[][]>((acc, _, i) => {
  if (i % 6 === 0) acc.push([])
  acc[acc.length - 1].push(WEBSITES[i])
  return acc
}, [])

function getMicrolinkUrl(url: string) {
  // Tall 2:3 viewport so the top half fits the 4:3 tile and the bottom half scrolls into view on hover.
  return `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&viewport.width=1200&viewport.height=1800&embed=screenshot.url`
}

function PreviewPlaceholder({ site }: { site: Website }) {
  const initial = site.title.charAt(0).toUpperCase()
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
      <div className="w-16 h-16 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-[28px] font-display font-bold text-white/80">
        {initial}
      </div>
      <p className="font-mono text-[10px] uppercase text-white/40 mt-3 tracking-[0.5px] text-center px-4">
        {site.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
      </p>
    </div>
  )
}

const TAG_STYLES: Record<string, string> = {
  plus: 'bg-white text-[#050505] border-white',
  shopify: 'bg-[#96BF48] text-[#050505] border-[#96BF48]',
  custom: 'bg-[#9EB356] text-[#050505] border-[#9EB356]',
  fullstack: 'bg-[#3B82F6] text-white border-[#3B82F6]',
  dawn: 'bg-white/10 text-white border-white/10',
  wordpress: 'bg-[#21759b] text-white border-[#21759b]',
}

const TAG_LABELS: Record<string, string> = {
  plus: 'Shopify Plus',
  shopify: 'Shopify',
  custom: 'Custom',
  fullstack: 'Full Stack',
  dawn: 'Dawn',
  wordpress: 'WordPress',
}

function TagPill({ tag }: { tag: string }) {
  const style = TAG_STYLES[tag] || 'bg-white/10 text-white border-white/10'
  const label = TAG_LABELS[tag] || tag.charAt(0).toUpperCase() + tag.slice(1)
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.5px] border ${style}`}>
      {label}
    </span>
  )
}

function CarouselDots() {
  const { api } = useCarousel()
  const [selected, setSelected] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setSelected(api.selectedScrollSnap())
    const onSelect = () => setSelected(api.selectedScrollSnap())
    api.on('select', onSelect)
    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  if (count <= 1) return null

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => api?.scrollTo(i)}
          className={`h-2 rounded-full transition-all duration-300 ${
            selected === i
              ? 'w-6 bg-[#9EB356]'
              : 'w-2 bg-white/30 hover:bg-white/50'
          }`}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  )
}

function PreviewTile({ site }: { site: Website }) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading')
  const [imageUrl, setImageUrl] = useState<string | null>(site.preview || getMicrolinkUrl(site.url))

  return (
    <div className="flex flex-col gap-3">
      <a
        href={site.url}
        target="_blank"
        rel="noopener noreferrer"
        className="showcase-tile group relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-[rgba(255,255,255,0.04)] transition-all duration-500 hover:border-[#9EB356]/50 hover:shadow-[0_0_40px_rgba(158,179,86,0.15)]"
      >
        {/* Live screenshot preview */}
        <div className="showcase-frame absolute inset-0 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={site.title}
              onLoad={() => setStatus('loaded')}
              onError={() => {
                setImageUrl(null)
                setStatus('error')
              }}
              className="showcase-preview absolute top-0 left-0 w-full h-full object-cover object-top"
              loading="eager"
              decoding="async"
            />
          ) : (
            <PreviewPlaceholder site={site} />
          )}
        </div>

        {/* Loading skeleton */}
        {status === 'loading' && imageUrl && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] z-10">
            <div className="w-8 h-8 border-2 border-white/20 border-t-[#9EB356] rounded-full animate-spin" />
            <p className="font-mono text-[10px] uppercase text-white/40 mt-3 tracking-[0.5px]">
              Loading preview…
            </p>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 flex items-end justify-between gap-3">
          <div>
            <h3 className="font-display text-[16px] md:text-[20px] font-bold text-white tracking-[-0.5px]">
              {site.title}
            </h3>
            <p className="font-mono text-[11px] uppercase text-[#9EB356] mt-1 tracking-[0.5px]">
              {site.url.replace(/^https?:\/\//, '')}
            </p>
          </div>
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white transition-all duration-300 group-hover:border-[#9EB356] group-hover:text-[#9EB356] group-hover:translate-x-1 group-hover:-translate-y-1">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 12L12 4M12 4H6M12 4V10" />
            </svg>
          </div>
        </div>
      </a>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {site.tags.map((tag) => (
          <TagPill key={tag} tag={tag} />
        ))}
      </div>
    </div>
  )
}

export default function WebsiteShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const autoplayRef = useRef(
    Autoplay({
      delay: 15000,
      stopOnMouseEnter: true,
      stopOnInteraction: false,
    })
  )

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    if (!section || !heading) return

    const ctx = gsap.context(() => {
      gsap.fromTo(heading,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          }
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative py-20 md:py-[120px] overflow-hidden"
      style={{ background: '#050505', zIndex: 1 }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Carousel */}
        <Carousel
          opts={{
            align: 'start',
            loop: SLIDES.length > 1,
          }}
          plugins={[autoplayRef.current]}
          className="w-full"
        >
          {/* Heading + Arrows */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
            <div ref={headingRef} className="opacity-0">
              <h2 className="font-display text-[clamp(48px,8vw,96px)] font-bold tracking-[-2.88px] uppercase text-white leading-[1.0]">
                SELECTED WORK
              </h2>
              <p className="font-body text-[16px] text-[#8A8A8A] max-w-[520px] mt-4">
                A few highlights from 80+ stores delivered across 5 continents.
              </p>
            </div>

            {SLIDES.length > 1 && (
              <div className="flex items-center gap-3">
                <CarouselPrevious
                  variant="outline"
                  size="icon"
                  className="static translate-y-0 size-10 rounded-full border-white/20 bg-transparent text-white hover:border-[#9EB356] hover:bg-transparent hover:text-[#9EB356]"
                />
                <CarouselNext
                  variant="outline"
                  size="icon"
                  className="static translate-y-0 size-10 rounded-full border-white/20 bg-transparent text-white hover:border-[#9EB356] hover:bg-transparent hover:text-[#9EB356]"
                />
              </div>
            )}
          </div>

          <CarouselContent className="-ml-4">
            {SLIDES.map((slide, slideIndex) => (
              <CarouselItem key={slideIndex} className="pl-4 basis-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {slide.map((site) => (
                    <PreviewTile key={site.id} site={site} />
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselDots />
        </Carousel>
      </div>

      <style>{`
        .showcase-preview {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .showcase-tile:hover .showcase-preview {
          animation: showcaseScroll 10s linear infinite;
        }
        @keyframes showcaseScroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
    </section>
  )
}
