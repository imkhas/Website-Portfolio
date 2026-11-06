import React, { useState } from 'react'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const Contact = () => {
  const [status, setStatus] = useState('')
  const [tone, setTone] = useState('')
  const [errors, setErrors] = useState({})

  const clear = (field) => setErrors((prev) => (prev[field] ? { ...prev, [field]: '' } : prev))

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const data = {
      name: formData.get('from_name'),
      email: formData.get('from_email'),
      message: formData.get('message'),
    }

    const next = {}
    if (!data.name.trim()) next.name = 'Please enter your name.'
    if (!EMAIL.test(data.email.trim())) next.email = 'Please enter a valid email address.'
    if (data.message.trim().length < 10) next.message = 'Please write at least 10 characters.'

    setErrors(next)
    if (Object.keys(next).length) {
      setStatus('')
      setTone('')
      return
    }

    setStatus('Sending...')
    setTone('')

    try {
      const response = await fetch('/.netlify/functions/sendTelegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setStatus('Message sent — thank you! I will get back to you soon.')
        setTone('success')
        e.target.reset()
      } else {
        const result = await response.json().catch(() => ({}))
        setStatus(`Failed: ${result.error || 'Unknown error'}`)
        setTone('error')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setStatus('An error occurred. Please try again later.')
      setTone('error')
    }
  }

  return (
    <div>
      <p className="section-title">Contact</p>

      <div className="map-box">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d15934.245917117649!2d101.4876108!3d3.2091898!3m2!1i1024!2i768!4f13.1!2m1!1sno%2010%20jalan%20selasih%203%20saujana%20utama%203%20sungai%20buloh%2047000%20selangor%20iframe!5e0!3m2!1sen!2smy!4v1749372838339!5m2!1sen!2smy"
          width="600" height="450"
          allowFullScreen="" loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div className="contact-layout">
        <div className="contact-info" data-stagger>
          <h3>Let's work together</h3>
          <p>Have a project in mind or just want to say hello? Drop me a message and I'll get back to you as soon as possible.</p>
          <div className="contact-detail">
            <ion-icon name="mail-outline"></ion-icon>
            <span>imrankhasrin@gmail.com</span>
          </div>
          <div className="contact-detail">
            <ion-icon name="phone-portrait-outline"></ion-icon>
            <span>+6019-8071707</span>
          </div>
          <div className="contact-detail">
            <ion-icon name="location-outline"></ion-icon>
            <span>Sungai Buloh, Selangor</span>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate data-stagger>
          <input
            type="text"
            name="from_name"
            className={`contact-input${errors.name ? ' invalid' : ''}`}
            placeholder="Full name"
            aria-invalid={!!errors.name}
            onChange={() => clear('name')}
          />
          {errors.name && <span className="field-error">{errors.name}</span>}

          <input
            type="email"
            name="from_email"
            className={`contact-input${errors.email ? ' invalid' : ''}`}
            placeholder="Email address"
            aria-invalid={!!errors.email}
            onChange={() => clear('email')}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}

          <textarea
            name="message"
            className={`contact-input${errors.message ? ' invalid' : ''}`}
            placeholder="Your Message"
            aria-invalid={!!errors.message}
            onChange={() => clear('message')}
          />
          {errors.message && <span className="field-error">{errors.message}</span>}

          <button className="contact-btn" type="submit">Send Message</button>
          {status && <p className={`contact-status ${tone}`}>{status}</p>}
        </form>
      </div>
    </div>
  )
}

export default Contact
