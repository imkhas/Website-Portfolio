import React, { useState } from 'react'

const Contact = () => {
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('Sending...')

    const formData = new FormData(e.target)
    const data = {
      name: formData.get('from_name'),
      email: formData.get('from_email'),
      message: formData.get('message'),
    }

    try {
      const response = await fetch('/.netlify/functions/sendTelegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setStatus('Message sent successfully!')
        e.target.reset()
      } else {
        const result = await response.json()
        setStatus(`Failed: ${result.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setStatus('An error occurred. Please try again later.')
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
        <div className="contact-info">
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

        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" name="from_name" className="contact-input" placeholder="Full name" required />
          <input type="email" name="from_email" className="contact-input" placeholder="Email address" required />
          <textarea name="message" className="contact-input" placeholder="Your Message" required></textarea>
          <button className="contact-btn" type="submit">Send Message</button>
          {status && <p className="contact-status">{status}</p>}
        </form>
      </div>
    </div>
  )
}

export default Contact
