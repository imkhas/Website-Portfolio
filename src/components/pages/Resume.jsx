import React from 'react';

const Resume = () => {
    return (
        <article className="resume active" data-page="resume">
            <header>
                <h2 className="h2 article-title">Resume</h2>
            </header>

            <section className="timeline">
                <div className="title-wrapper">
                    <div className="icon-box">
                        <ion-icon name="book-outline"></ion-icon>
                    </div>
                    <h3 className="h3">Work Experience</h3>
                </div>

                <ol className="timeline-list">
                    <li className="timeline-item">
                        <h4 className="h4 timeline-item-title">Data Analyst Internship</h4>
                        <span>Sep 2025 - Present</span>
                        <p className="timeline-text">PORT KLANG FREE ZONE SDN BHD, Klang, MY</p>
                        <ul className="timeline-text" style={{ listStyle: 'disc', paddingLeft: '20px', marginTop: '10px', color: 'var(--light-gray)' }}>
                            <li style={{ marginBottom: '8px' }}>Cleaned and analyzed procurement data to identify cost trends and supplier performance metrics.</li>
                            <li style={{ marginBottom: '8px' }}>Developed and maintained Power BI dashboards to visualize purchase order counts, spending distribution, and vendor efficiency.</li>
                            <li style={{ marginBottom: '8px' }}>Generated weekly and monthly performance reports and presented insights to supervisors for informed decision-making.</li>
                        </ul>
                    </li>

                    <li className="timeline-item">
                        <h4 className="h4 timeline-item-title">Junior Web Developer Internship</h4>
                        <span>Oct 2021 - Feb 2022</span>
                        <p className="timeline-text">PANTAI BHARU HOLDINGS SDN BHD, Klang, MY</p>
                        <ul className="timeline-text" style={{ listStyle: 'disc', paddingLeft: '20px', marginTop: '10px', color: 'var(--light-gray)' }}>
                            <li style={{ marginBottom: '8px' }}>Learned and practiced web platform development and best practices from experienced developers within the company.</li>
                            <li style={{ marginBottom: '8px' }}>Identified and debugged 70% of the bugs for the front-end part of the production system to enhance the system's overall performance.</li>
                            <li style={{ marginBottom: '8px' }}>Created a user-friendly app for the company cafe to order food and a website for the proton department to insert customer information.</li>
                        </ul>
                    </li>
                </ol>
            </section>

            <section className="timeline">
                <div className="title-wrapper">
                    <div className="icon-box">
                        <ion-icon name="book-outline"></ion-icon>
                    </div>
                    <h3 className="h3">Education</h3>
                </div>

                <ol className="timeline-list">
                    <li className="timeline-item">
                        <h4 className="h4 timeline-item-title">UNIVERSITI TEKNOLOGI MARA</h4>
                        <span>2022 - Present</span>
                        <p className="timeline-text">
                            Bachelor Of Information Systems (Hons.) Intelligent Systems Engineering<br />
                            Shah Alam, MY<br />
                            CGPA: 3.41
                        </p>
                        <p className="timeline-text" style={{ marginTop: '10px' }}>
                            <strong>Relevant Coursework:</strong> Machine Learning, Data Mining, Time Series Analysis and Forecasting, Optimization Algorithms and Applications, Fuzzy Logic, Programming For Data Science
                        </p>
                    </li>

                    <li className="timeline-item">
                        <h4 className="h4 timeline-item-title">POLITEKNIK SULTAN HAJI AHMAD SHAH (POLISAS)</h4>
                        <span>2018 - 2022</span>
                        <p className="timeline-text">
                            Diploma In Business Information Systems<br />
                            Kuantan, MY<br />
                            CGPA: 3.68
                        </p>
                        <p className="timeline-text" style={{ marginTop: '10px' }}>
                            <strong>Relevant Coursework:</strong> Web development, Web Programming, Database Management System, Project Management, Digital Entrepreneurship Development
                        </p>
                    </li>
                </ol>
            </section>

            <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
                <a
                    href="/assets/resume.pdf"
                    download="Muhamad_Imran_Resume.pdf"
                    className="form-btn"
                    style={{
                        width: 'max-content',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}
                >
                    <ion-icon name="download-outline"></ion-icon>
                    <span>Download CV</span>
                </a>
            </div>
        </article>
    );
};

export default Resume;
