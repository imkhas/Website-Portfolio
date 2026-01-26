import React from 'react';

const About = () => {
    return (
        <article className="about active" data-page="about">
            <header>
                <h2 className="h2 article-title">About me</h2>
            </header>

            <section className="about-text">
                <p>
                    I'm an AI Engineer and Web Developer from Malaysia and currently in my final year at Universiti Teknologi MARA (UiTM),
                    majoring in Intelligent Systems Engineering. I specialize in crafting data-driven solutions and building responsive
                    user-friendly web applications.
                </p>

                <p>
                    I enjoy transforming technical challenges into smart and intuitive systems such as developing machine learning models to solve real-world problems or designing websites that are both functional and visually compelling.
                    My work bridges the gap between artificial intelligence and front-end development,
                    giving every project both a logical core and a creative edge.
                </p>
            </section>

            <section className="service">
                <h3 className="h3 service-title">What i'm doing</h3>

                <ul className="service-list">
                    <li className="service-item">
                        <div className="service-icon-box">
                            <img src="/assets/images/icon-design.svg" alt="design icon" width="40" />
                        </div>
                        <div className="service-content-box">
                            <h4 className="h4 service-item-title">Machine Learning</h4>
                            <p className="service-item-text">
                                Focused on applying machine learning techniques to create accurate and scalable predictive solutions.
                            </p>
                        </div>
                    </li>

                    <li className="service-item">
                        <div className="service-icon-box">
                            <img src="/assets/images/icon-dev.svg" alt="Web development icon" width="40" />
                        </div>
                        <div className="service-content-box">
                            <h4 className="h4 service-item-title">Web development</h4>
                            <p className="service-item-text">
                                Transforming ideas into functional and appealing websites for users.
                            </p>
                        </div>
                    </li>

                    <li className="service-item">
                        <div className="service-icon-box">
                            <img src="/assets/images/icon-app.svg" alt="mobile app icon" width="40" />
                        </div>
                        <div className="service-content-box">
                            <h4 className="h4 service-item-title">Optimization</h4>
                            <p className="service-item-text">
                                Focused on developing optimization models that enhance speed and overall outcomes.
                            </p>
                        </div>
                    </li>

                    <li className="service-item">
                        <div className="service-icon-box">
                            <img src="/assets/images/icon-photo.png" alt="camera icon" width="40" />
                        </div>
                        <div className="service-content-box">
                            <h4 className="h4 service-item-title">Data Analyst</h4>
                            <p className="service-item-text">
                                Transforming raw data into meaningful insights through statistical analysis and visualization techniques.
                            </p>
                        </div>
                    </li>
                </ul>
            </section>
        </article>
    );
};

export default About;
