import React, { useState } from 'react';

const Contact = () => {
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');

        const formData = new FormData(e.target);
        const data = {
            name: formData.get('from_name'),
            email: formData.get('from_email'),
            message: formData.get('message'),
        };

        // Environment variables for security
        const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
        const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

        const text = `New Portfolio Message:\n\nName: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`;

        try {
            const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: text,
                }),
            });

            if (response.ok) {
                setStatus('Message sent successfully!');
                e.target.reset();
            } else {
                setStatus('Failed to send message. Please check bot configuration.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus('An error occurred. Please try again later.');
        }
    };

    return (
        <article className="contact active" data-page="contact">
            <header>
                <h2 className="h2 article-title">Contact</h2>
            </header>

            <section className="mapbox" data-mapbox>
                <figure>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d15934.245917117649!2d101.4876108!3d3.2091898!3m2!1i1024!2i768!4f13.1!2m1!1sno%2010%20jalan%20selasih%203%20saujana%20utama%203%20sungai%20buloh%2047000%20selangor%20iframe!5e0!3m2!1sen!2smy!4v1749372838339!5m2!1sen!2smy"
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </figure>
            </section>

            <section className="contact-form">
                <h3 className="h3 form-title">Contact Form</h3>
                <form className="form" data-form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <input
                            type="text"
                            name="from_name"
                            className="form-input"
                            placeholder="Full name"
                            required
                            data-form-input
                        />
                        <input
                            type="email"
                            name="from_email"
                            className="form-input"
                            placeholder="Email address"
                            required
                            data-form-input
                        />
                    </div>
                    <textarea
                        name="message"
                        className="form-input"
                        placeholder="Your Message"
                        required
                        data-form-input
                    ></textarea>
                    <button className="form-btn" type="submit" data-form-btn>
                        <ion-icon name="paper-plane"></ion-icon>
                        <span>Send Message</span>
                    </button>
                    {status && <p style={{ color: 'var(--orange-yellow-crayola)', marginTop: '15px', fontSize: '14px' }}>{status}</p>}
                </form>
            </section>
        </article>
    );
};

export default Contact;
