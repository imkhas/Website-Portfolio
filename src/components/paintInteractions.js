const PAINT = ['#c0491f', '#d9773a', '#2f6f68', '#e0a04a', '#8a3b1e']
const MAGNET = '.btn, .socials a, .nav-logo, .resume-download a, .contact-btn, .scroll-cue'

export function initPaintInteractions() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) return () => {}

  const canvas = document.createElement('canvas')
  canvas.className = 'paint-trail'
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')

  let W = 0
  let H = 0
  let dpr = 1

  const resize = () => {
    W = window.innerWidth
    H = window.innerHeight
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = W * dpr
    canvas.height = H * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }
  resize()

  const daubs = []
  const drops = []
  const pointer = { x: W / 2, y: H / 2 }
  const last = { x: W / 2, y: H / 2 }

  const addDaub = (x, y) => {
    daubs.push({
      x,
      y,
      r: 2.5 + Math.random() * 5.5,
      sy: 0.55 + Math.random() * 0.6,
      rot: Math.random() * Math.PI,
      color: PAINT[Math.floor(Math.random() * PAINT.length)],
      life: 0,
      ttl: 380 + Math.random() * 420,
    })
    if (daubs.length > 160) daubs.shift()
    kick()
  }

  const splat = (x, y) => {
    const n = 10 + Math.floor(Math.random() * 8)
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2
      const sp = 40 + Math.random() * 200
      drops.push({
        x,
        y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp - 40,
        r: 1.5 + Math.random() * 3.5,
        color: PAINT[Math.floor(Math.random() * PAINT.length)],
        life: 0,
        ttl: 520 + Math.random() * 420,
      })
    }
    kick()
  }

  let active = null

  const onMove = (e) => {
    pointer.x = e.clientX
    pointer.y = e.clientY

    const dx = pointer.x - last.x
    const dy = pointer.y - last.y
    if (dx * dx + dy * dy > 30) {
      last.x = pointer.x
      last.y = pointer.y
      addDaub(pointer.x, pointer.y)
    }

    const el = e.target && e.target.closest ? e.target.closest(MAGNET) : null
    if (el !== active) {
      if (active) active.style.translate = ''
      active = el
    }
    if (el) {
      const r = el.getBoundingClientRect()
      const nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
      const ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
      el.style.translate = `${(nx * 6).toFixed(2)}px ${(ny * 5).toFixed(2)}px`
    }
  }

  const onDown = (e) => {
    splat(e.clientX, e.clientY)
  }

  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('pointerdown', onDown, { passive: true })
  window.addEventListener('resize', resize)

  let prev = 0
  let raf = 0
  let running = false

  const frame = (now) => {
    const dt = prev ? Math.min((now - prev) / 1000, 0.05) : 0.016
    prev = now

    ctx.clearRect(0, 0, W, H)

    for (let i = daubs.length - 1; i >= 0; i--) {
      const d = daubs[i]
      d.life += dt * 1000
      const p = d.life / d.ttl
      if (p >= 1) {
        daubs.splice(i, 1)
        continue
      }
      ctx.globalAlpha = (1 - p) * 0.55
      ctx.fillStyle = d.color
      ctx.beginPath()
      ctx.ellipse(d.x, d.y, d.r * (0.7 + p * 0.7), d.r * d.sy, d.rot, 0, Math.PI * 2)
      ctx.fill()
    }

    for (let i = drops.length - 1; i >= 0; i--) {
      const d = drops[i]
      d.life += dt * 1000
      const p = d.life / d.ttl
      if (p >= 1) {
        drops.splice(i, 1)
        continue
      }
      d.vy += 220 * dt
      d.x += d.vx * dt
      d.y += d.vy * dt
      ctx.globalAlpha = (1 - p) * 0.9
      ctx.fillStyle = d.color
      ctx.beginPath()
      ctx.arc(d.x, d.y, Math.max(0.1, d.r * (1 - p * 0.4)), 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.globalAlpha = 1

    if (daubs.length || drops.length) {
      raf = requestAnimationFrame(frame)
    } else {
      running = false
    }
  }

  const kick = () => {
    if (running) return
    running = true
    prev = 0
    raf = requestAnimationFrame(frame)
  }

  return () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerdown', onDown)
    window.removeEventListener('resize', resize)
    if (active) active.style.translate = ''
    canvas.remove()
  }
}
