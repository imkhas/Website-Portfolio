import React, { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { hyperspaceTransition } from './hyperspaceTransition'
import { initPaintInteractions } from './paintInteractions'
import { getLenis, setLenis } from '../smoothScroll'
import About from './pages/About'
import Resume from './pages/Resume'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'

// ✏️ Edit your links here
const SOCIALS = [
  { name: 'GitHub', icon: 'logo-github', href: 'https://github.com/imkhas' },
  { name: 'LinkedIn', icon: 'logo-linkedin', href: 'https://www.linkedin.com/in/imran-khasrin1/' },
  { name: 'Email', icon: 'mail-outline', href: 'mailto:imrankhasrin@gmail.com' },
]

const sections = [
  { label: 'About', id: 'about' },
  { label: 'Background', id: 'resume' },
  { label: 'Projects', id: 'portfolio' },
  { label: 'Contact', id: 'contact' },
]

// Set to true to skip the page transition for visitors whose OS has animations turned off
const RESPECT_REDUCED_MOTION = false
const reduceMotion = () =>
  RESPECT_REDUCED_MOTION && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const go = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  const lenis = getLenis()
  if (reduceMotion() || !lenis) return el.scrollIntoView({ behavior: 'smooth' })
  lenis.stop()
  hyperspaceTransition(
    () => lenis.scrollTo(el, { offset: -60, immediate: true, force: true }),
    () => lenis.start()
  )
}

const Socials = ({ className = '' }) => (
  <div className={`socials ${className}`}>
    {SOCIALS.map((s) => (
      <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} title={s.name}>
        <ion-icon name={s.icon}></ion-icon>
      </a>
    ))}
  </div>
)

const Hero = () => {
  const ref = useRef(null)

  // subtle 3D parallax that follows the cursor
  const onMove = (e) => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const x = e.clientX / window.innerWidth - 0.5
    const y = e.clientY / window.innerHeight - 0.5
    el.style.setProperty('--rx', `${(-y * 14).toFixed(2)}deg`)
    el.style.setProperty('--ry', `${(x * 18).toFixed(2)}deg`)
  }

  return (
    <section className="hero" id="hero" ref={ref} onMouseMove={onMove}>
      <div className="beam" />
      <div className="hero-inner">
        <div className="hero-text">
          <h1>Muhamad<br /><span>Imran</span></h1>
          <p><strong className="hero-role">AI Engineer &amp; Web Developer</strong><br />Computer vision, edge AI, full-stack development and data analytics.</p>
          <div className="hero-cta">
            <button className="btn btn-solid" onClick={() => go('portfolio')}>View projects</button>
            <a className="btn" href="/assets/resume.pdf" download="Muhamad_Imran_Resume.pdf">Download CV</a>
          </div>
          <Socials />
        </div>
        <div className="signal" aria-hidden="true">
          <div className="signal-glow" />
          <div className="portrait"><img src="/assets/images/profile.png" alt="Muhamad Imran" /></div>
        </div>
      </div>
      <button className="scroll-cue" onClick={() => go('about')} aria-label="Scroll down">↓</button>
    </section>
  )
}

const Home = () => {
  const progressRef = useRef(null)
  const [active, setActive] = useState('hero')

  useEffect(() => {
    if (reduceMotion()) return
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })
    setLenis(lenis)
    let raf
    const loop = (time) => { lenis.raf(time); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy(); setLenis(null) }
  }, [])

  useEffect(() => initPaintInteractions(), [])

  useEffect(() => {
    const el = progressRef.current
    if (!el) return
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      el.style.transform = `scaleX(${p})`
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    const ids = ['hero', ...sections.map((s) => s.id)]
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return
        e.target.classList.add('in')
        e.target.querySelectorAll('[data-stagger]').forEach((group) => {
          Array.from(group.children).forEach((child, i) => child.style.setProperty('--i', i))
        })
        io.unobserve(e.target)
      }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <div className="scroll-progress" ref={progressRef} />
      <nav className="nav">
        <a className="nav-logo" onClick={() => go('hero')} aria-label="Home">IK</a>
        <div className="nav-links">
          {sections.map((s) => (
            <a key={s.id} className={active === s.id ? 'active' : ''} onClick={() => go(s.id)}>{s.label}</a>
          ))}
        </div>
        <Socials className="nav-socials" />
      </nav>
      <div className="page">
      <Hero />
      <main className="content-sections">
        <section id="about" className="content-section reveal"><About /></section>
        <section id="resume" className="content-section reveal"><Resume /></section>
        <section id="portfolio" className="content-section reveal"><Portfolio /></section>
        <section id="contact" className="content-section reveal"><Contact /></section>
      </main>
      <footer className="footer">
        <Socials />
        <p>© {new Date().getFullYear()} Muhamad Imran</p>
      </footer>
      </div>
    </>
  )
}

export default Home