import React, { useEffect, useRef } from 'react'

const CountUp = ({ to, decimals = 0, suffix = '' }) => {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      el.textContent = to.toFixed(decimals) + suffix
      return
    }
    let raf = 0
    let started = 0
    const tick = (now) => {
      if (!started) started = now
      const p = Math.min((now - started) / 1200, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      el.textContent = (to * eased).toFixed(decimals) + suffix
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      raf = requestAnimationFrame(tick)
    }, { threshold: .4 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [to, decimals, suffix])

  return <span ref={ref}>0{suffix}</span>
}

const stats = [
  { to: 3, label: 'Internships' },
  { to: 10, suffix: '+', label: 'Projects built' },
  { to: 3.48, decimals: 2, label: 'CGPA' },
]

const About = () => (
  <div>
    <p className="section-title">About Me</p>

    <div className="stats" data-stagger>
      {stats.map((s) => (
        <div className="stat" key={s.label}>
          <b><CountUp to={s.to} decimals={s.decimals} suffix={s.suffix} /></b>
          <span>{s.label}</span>
        </div>
      ))}
    </div>

    <div className="section-text" data-stagger>
      <p>
        I am a recent graduate in Intelligent Systems Engineering (AI Engineering) from Universiti Teknologi MARA (UiTM) with a strong interest in Artificial Intelligence, Computer Vision, Full-Stack Development, and Edge AI. I enjoy transforming ideas into practical software solutions, from developing intelligent applications to deploying AI models on mobile and edge devices.
      </p>
      <p>
        Through my internship as an AI Engineer, I have gained hands-on experience in building end-to-end computer vision pipelines, preparing and annotating datasets, training and optimizing deep learning models, and deploying AI solutions using TensorFlow Lite, ONNX, and TensorRT. I have also developed Android applications that integrate on-device AI inference for real-time object detection.
      </p>
      <p>
        Beyond AI, I have experience building web applications using React, PHP, MySQL, JavaScript, HTML, CSS, and Tailwind CSS. I enjoy working across both frontend and backend development, combining software engineering principles with machine learning to create scalable and user-friendly applications.
      </p>
      <p>
        I am passionate about continuous learning, solving real-world problems with technology, and building innovative solutions that make a meaningful impact.
      </p>
    </div>
  </div>
)

export default About
