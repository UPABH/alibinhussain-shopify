import { useRef, useEffect } from 'react'

interface Dot {
  x: number
  y: number
  baseAlpha: number
  alpha: number
  radius: number
}

export default function DotGridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const SPACING = 30
    const ANGLE = Math.PI / 4
    const MOUSE_RADIUS = 150
    const cosA = Math.cos(ANGLE)
    const sinA = Math.sin(ANGLE)

    let w = window.innerWidth
    let h = window.innerHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let dots: Dot[] = []
    let mouseX = -9999
    let mouseY = -9999
    let currentMouseX = -9999
    let currentMouseY = -9999

    function generateGrid() {
      dots = []
      const diagonal = Math.sqrt(w * w + h * h)
      const cols = Math.ceil(diagonal / SPACING)
      const rows = Math.ceil(diagonal / SPACING)
      const offsetX = (w - cols * SPACING) / 2
      const offsetY = (h - rows * SPACING) / 2

      for (let c = 0; c <= cols; c++) {
        for (let r = 0; r <= rows; r++) {
          const px = offsetX + c * SPACING
          const py = offsetY + r * SPACING
          const rx = px * cosA + py * sinA
          const ry = -px * sinA + py * cosA

          if (rx >= -SPACING && rx <= w + SPACING && ry >= -SPACING && ry <= h + SPACING) {
            dots.push({
              x: rx * dpr,
              y: ry * dpr,
              baseAlpha: Math.random() * 0.08 + 0.03,
              alpha: 0,
              radius: (Math.random() * 1.5 + 1.5) * dpr
            })
          }
        }
      }
    }

    function resize() {
      w = window.innerWidth
      h = window.innerHeight
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      canvas!.style.width = w + 'px'
      canvas!.style.height = h + 'px'
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      generateGrid()
    }

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    let lastTime = 0
    let animId = 0

    function render(now: number) {
      if (!ctx) return
      const dt = Math.min(now - lastTime, 50)
      lastTime = now

      const fadeIn = 1 - Math.pow(0.9985, dt * 0.06)
      const fadeOut = 1 - Math.pow(0.985, dt * 0.06)

      const targetMX = mouseX * dpr
      const targetMY = mouseY * dpr

      if (currentMouseX < -9000) {
        currentMouseX = targetMX
        currentMouseY = targetMY
      }

      const lerpFactor = 1 - Math.pow(0.92, dt * 0.06)
      currentMouseX += (targetMX - currentMouseX) * lerpFactor
      currentMouseY += (targetMY - currentMouseY) * lerpFactor

      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'screen'

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i]
        const dx = dot.x - currentMouseX
        const dy = dot.y - currentMouseY
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < MOUSE_RADIUS * dpr) {
          const proximity = 1 - dist / (MOUSE_RADIUS * dpr)
          dot.alpha = Math.max(dot.alpha, proximity * 0.7 + dot.baseAlpha)
        }

        const diff = dot.baseAlpha - dot.alpha
        if (diff > 0.001) {
          dot.alpha += diff * fadeIn
        } else if (diff < -0.001) {
          dot.alpha -= (-diff) * fadeOut
        } else {
          dot.alpha = dot.baseAlpha
        }

        if (dot.alpha > 0.001) {
          const gradient = ctx.createRadialGradient(
            dot.x / dpr, dot.y / dpr, 0,
            dot.x / dpr, dot.y / dpr, dot.radius / dpr
          )
          gradient.addColorStop(0, `rgba(255, 255, 255, ${dot.alpha})`)
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(dot.x / dpr, dot.y / dpr, dot.radius / dpr, 0, Math.PI * 2)
          ctx.fill()

          ctx.strokeStyle = `rgba(255, 255, 255, ${dot.alpha * 0.3})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }

      ctx.globalCompositeOperation = 'source-over'
      animId = requestAnimationFrame(render)
    }

    resize()
    animId = requestAnimationFrame(render)

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  )
}
