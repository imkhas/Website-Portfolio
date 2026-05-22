import React from 'react'
import About from './pages/About'
import Resume from './pages/Resume'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const sections = [
  { label: 'ABOUT', id: 'about' },
  { label: 'RESUME', id: 'resume' },
  { label: 'PORTFOLIO', id: 'portfolio' },
  { label: 'CONTACT', id: 'contact' },
]

const Hero = () => (
  <section className="hero" id="hero">
    <div className="hero-bg" />
    <div className="hero-logo">IK</div>
    <div className="hero-circle">
      <img src="/assets/images/profile.png" alt="Muhamad Imran" />
    </div>
    <div className="hero-content">
      <h1>MUHAMAD<br />IMRAN</h1>
      <p>AI Engineer &amp; Web Developer</p>
    </div>
    <div className="hero-connect">
      <span>EXPLORE</span>
      <div className="hero-connect-btn" onClick={() => scrollTo('about')}>↓</div>
    </div>
  </section>
)

const Home = () => (
  <>
    <nav className="hero-nav">
      {sections.map((s) => (
        <a key={s.id} onClick={() => scrollTo(s.id)}>{s.label}</a>
      ))}
    </nav>
    <Hero />
    <div className="content-sections">
      <section id="about" className="content-section"><About /></section>
      <section id="resume" className="content-section"><Resume /></section>
      <section id="portfolio" className="content-section"><Portfolio /></section>
      <section id="contact" className="content-section"><Contact /></section>
    </div>
  </>
)

export default Home
