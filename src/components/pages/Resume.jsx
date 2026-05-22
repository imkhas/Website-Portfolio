import React from 'react'

const Resume = () => (
  <div>
    <p className="section-title">Resume</p>

    <h3 className="section-heading">Work Experience</h3>

    <div className="timeline">
      <div className="timeline-item">
        <h3>Data Analyst Internship</h3>
        <div className="timeline-date">Sep 2025 - Present</div>
        <div className="timeline-org">PORT KLANG FREE ZONE SDN BHD, Klang, MY</div>
        <ul>
          <li>Cleaned and analyzed procurement data to identify cost trends and supplier performance metrics.</li>
          <li>Developed and maintained Power BI dashboards to visualize purchase order counts, spending distribution, and vendor efficiency.</li>
          <li>Generated weekly and monthly performance reports and presented insights to supervisors for informed decision-making.</li>
        </ul>
      </div>

      <div className="timeline-item">
        <h3>Junior Web Developer Internship</h3>
        <div className="timeline-date">Oct 2021 - Feb 2022</div>
        <div className="timeline-org">PANTAI BHARU HOLDINGS SDN BHD, Klang, MY</div>
        <ul>
          <li>Learned and practiced web platform development and best practices from experienced developers within the company.</li>
          <li>Identified and debugged 70% of the bugs for the front-end part of the production system to enhance the system's overall performance.</li>
          <li>Created a user-friendly app for the company cafe to order food and a website for the proton department to insert customer information.</li>
        </ul>
      </div>
    </div>

    <h3 className="section-heading" style={{ marginTop: 60 }}>Education</h3>

    <div className="timeline">
      <div className="timeline-item">
        <h3>UNIVERSITI TEKNOLOGI MARA</h3>
        <div className="timeline-date">2022 - Present</div>
        <div className="timeline-org">
          Bachelor Of Information Systems (Hons.) Intelligent Systems Engineering<br />
          Shah Alam, MY<br />
          CGPA: 3.41
        </div>
        <p><strong>Relevant Coursework:</strong> Machine Learning, Data Mining, Time Series Analysis and Forecasting, Optimization Algorithms and Applications, Fuzzy Logic, Programming For Data Science</p>
      </div>

      <div className="timeline-item">
        <h3>POLITEKNIK SULTAN HAJI AHMAD SHAH (POLISAS)</h3>
        <div className="timeline-date">2018 - 2022</div>
        <div className="timeline-org">
          Diploma In Business Information Systems<br />
          Kuantan, MY<br />
          CGPA: 3.68
        </div>
        <p><strong>Relevant Coursework:</strong> Web development, Web Programming, Database Management System, Project Management, Digital Entrepreneurship Development</p>
      </div>
    </div>

    <div className="resume-download">
      <a href="/assets/resume.pdf" download="Muhamad_Imran_Resume.pdf">
        <ion-icon name="download-outline"></ion-icon>
        <span>Download CV</span>
      </a>
    </div>
  </div>
)

export default Resume
