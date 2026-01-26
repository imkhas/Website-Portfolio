import React from 'react';

const Sidebar = () => {
    return (
        <aside className="sidebar" data-sidebar>
            <div className="sidebar-info">
                <figure className="avatar-box">
                    <img src="/assets/images/my-avatar.jpeg" alt="Muhamad Imran" width="80" />
                </figure>

                <div className="info-content">
                    <h1 className="name" title="Muhamad Imran">Muhamad Imran</h1>
                    <p className="title">Web Developer</p><br />
                    <p className="title">AI Engineer</p>
                </div>

                <button className="info_more-btn" data-sidebar-btn>
                    <span>Show Contacts</span>
                    <ion-icon name="chevron-down"></ion-icon>
                </button>
            </div>

            <div className="sidebar-info_more">
                <div className="separator"></div>

                <ul className="contacts-list">
                    <li className="contact-item">
                        <div className="icon-box">
                            <ion-icon name="mail-outline"></ion-icon>
                        </div>
                        <div className="contact-info">
                            <p className="contact-title">Email</p>
                            <a href="mailto:imrankhasrin@gmail.com" className="contact-link">imrankhasrin@gmail.com</a>
                        </div>
                    </li>

                    <li className="contact-item">
                        <div className="icon-box">
                            <ion-icon name="phone-portrait-outline"></ion-icon>
                        </div>
                        <div className="contact-info">
                            <p className="contact-title">Phone</p>
                            <a href="tel:+60198071707" className="contact-link">+6019-8071707</a>
                        </div>
                    </li>

                    <li className="contact-item">
                        <div className="icon-box">
                            <ion-icon name="calendar-outline"></ion-icon>
                        </div>
                        <div className="contact-info">
                            <p className="contact-title">Birthday</p>
                            <time dateTime="2000-07-18">July 18, 2000</time>
                        </div>
                    </li>

                    <li className="contact-item">
                        <div className="icon-box">
                            <ion-icon name="location-outline"></ion-icon>
                        </div>
                        <div className="contact-info">
                            <p className="contact-title">Location</p>
                            <address>Sungai Buloh, Selangor</address>
                        </div>
                    </li>
                </ul>

                <div className="separator"></div>

                <ul className="social-list">
                    <li className="social-item">
                        <a href="https://www.facebook.com/imran.khasrin.9/" className="social-link">
                            <ion-icon name="logo-facebook"></ion-icon>
                        </a>
                    </li>
                    <li className="social-item">
                        <a href="https://www.linkedin.com/in/imran-khasrin1" className="social-link">
                            <ion-icon name="logo-linkedin"></ion-icon>
                        </a>
                    </li>
                    <li className="social-item">
                        <a href="https://www.instagram.com/imrankhasrin/" className="social-link">
                            <ion-icon name="logo-instagram"></ion-icon>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
