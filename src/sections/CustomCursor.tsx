import { useRef, useEffect, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      setIsTouch(window.matchMedia('(pointer: coarse)').matches)
    }
    checkTouch()

    if (isTouch) return

    const cursor = cursorRef.current
    if (!cursor) return

    let x = -100
    let y = -100
    let targetX = -100
    let targetY = -100
    let isHovering = false

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]')
      ) {
        isHovering = true
      }
    }

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]')
      ) {
        isHovering = false
      }
    }

    let animId = 0

    const animate = () => {
      x += (targetX - x) * 0.15
      y += (targetY - y) * 0.15

      const size = isHovering ? 40 : 8

      cursor.style.transform = `translate(${x - size / 2}px, ${y - size / 2}px)`
      cursor.style.width = `${size}px`
      cursor.style.height = `${size}px`

      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
    }
  }, [isTouch])

  if (isTouch) return null

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-[width,height] duration-200"
      style={{
        width: '8px',
        height: '8px',
        background: '#9EB356',
        mixBlendMode: 'difference',
        willChange: 'transform',
      }}
    />
  )
}
