const DURATION = 1100
const JUMP_AT = 470
const COLORS = ['#2b2620', '#c0491f', '#2f6f68', '#6f665a', '#8a3b1e', '#b8a888']
let busy = false

export function hyperspaceTransition(jump, done) {
  if (busy) return
  busy = true

  const page = document.querySelector('.page')
  const W = window.innerWidth
  const H = window.innerHeight
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const cx = W / 2
  const cy = H / 2
  const fov = Math.max(W, H) * 0.9
  const maxZ = fov * 1.6
  const span = Math.max(W, H) * 0.7

  const canvas = document.createElement('canvas')
  canvas.width = W * dpr
  canvas.height = H * dpr
  canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;z-index:60;pointer-events:none'
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')
  ctx.scale(dpr, dpr)

  const count = Math.max(140, Math.min(360, Math.round((W * H) / 4800)))

  const reset = (s, initial) => {
    const z = initial ? 80 + Math.random() * (maxZ - 80) : maxZ
    const rad = Math.sqrt(Math.random()) * span * (z / fov)
    const ang = Math.random() * Math.PI * 2
    s.x = Math.cos(ang) * rad
    s.y = Math.sin(ang) * rad
    s.z = z
    s.pz = z
    s.color = COLORS[Math.floor(Math.random() * COLORS.length)]
    s.w = 0.7 + Math.random() * 1.5
    return s
  }

  const stars = Array.from({ length: count }, () => reset({}, true))

  page?.classList.add('dissolve')
  const start = performance.now()
  let last = start
  let jumped = false

  const frame = (now) => {
    const t = now - start
    const p = Math.min(t / DURATION, 1)
    const dt = Math.min((now - last) / 1000, 0.05)
    last = now

    if (!jumped && t >= JUMP_AT) {
      jumped = true
      jump()
      page?.classList.remove('dissolve')
    }

    const boost = 0.18 + Math.pow(Math.sin(Math.PI * p), 2)
    const zSpeed = fov * 2.4 * boost
    const fade = t < DURATION - 200 ? 1 : Math.max(0, (DURATION - t) / 200)

    ctx.clearRect(0, 0, W, H)

    ctx.fillStyle = `rgba(242,235,221,${0.65 * boost * fade})`
    ctx.fillRect(0, 0, W, H)

    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.6)
    glow.addColorStop(0, `rgba(192,73,31,${0.14 * boost * fade})`)
    glow.addColorStop(0.45, `rgba(47,111,104,${0.05 * boost * fade})`)
    glow.addColorStop(1, 'rgba(120,90,55,0)')
    ctx.fillStyle = glow
    ctx.fillRect(0, 0, W, H)

    ctx.lineCap = 'round'

    for (const s of stars) {
      s.pz = s.z
      s.z -= zSpeed * dt

      if (s.z <= 20) {
        reset(s, false)
        continue
      }

      const k = fov / s.z
      const pk = fov / s.pz
      const x = cx + s.x * k
      const y = cy + s.y * k
      const px = cx + s.x * pk
      const py = cy + s.y * pk

      if (x < -120 || x > W + 120 || y < -120 || y > H + 120) continue

      const near = 1 - s.z / maxZ
      const alpha = Math.min(1, 0.25 + near * 1.2) * fade
      if (alpha <= 0.01) continue

      ctx.globalAlpha = alpha
      ctx.strokeStyle = s.color
      ctx.lineWidth = s.w * (0.5 + near * 2.2)
      ctx.beginPath()
      ctx.moveTo(px, py)
      ctx.lineTo(x, y)
      ctx.stroke()
    }

    ctx.globalAlpha = 1

    if (t < DURATION) requestAnimationFrame(frame)
    else {
      canvas.remove()
      busy = false
      done?.()
    }
  }

  requestAnimationFrame(frame)
}
