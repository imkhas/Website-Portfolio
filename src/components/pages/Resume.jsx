import React from 'react'

const Resume = () => (
  <div>
    <p className="section-title">Resume</p>

    <h3 className="section-heading">Work Experience</h3>

    <div className="timeline">
      <div className="timeline-item">
        <h3>AI Engineer Internship</h3>
        <div className="timeline-date">May 2026 - Present</div>
        <div className="timeline-org">ROBOMY SDN BHD, Kuala Lumpur, MY</div>
        <ul>
          <li>Engineered and validated computer vision datasets using CVAT for object detection model training and evaluation.</li>
          <li>Developed and streamlined machine learning pipeline workflows covering data preprocessing, model training, evaluation and optimization for computer vision applications.</li>
          <li>Programmed and executed edge AI inference experiments on Raspberry Pi to evaluate real-time object detection performance in resource-constrained environments.</li>
          <li>Developed an Android application in Kotlin integrating on-device YOLO inference with TensorFlow Lite for real-time object detection.</li>
          <li>Optimized mobile inference using TensorFlow Lite with NNAPI, GPU delegation and CPU fallback to improve real-time performance on Android devices.</li>
          <li>Standardized and documented end-to-end AI workflows from dataset preparation to edge deployment to improve reproducibility and consistency.</li>
        </ul>
      </div>

      <div className="timeline-item">
        <h3>Data Analyst Internship</h3>
        <div className="timeline-date">Sep 2025 - Dec 2025</div>
        <div className="timeline-org">PORT KLANG FREE ZONE SDN BHD, Klang, MY</div>
        <ul>
          <li>Cleaned and analyzed large-scale procurement datasets using Excel and SQL to identify cost-saving opportunities, supplier performance trends, and purchasing inefficiencies.</li>
          <li>Generated weekly and monthly performance reports by translating complex data into actionable insights for supervisors, leading to a 15% improvement in procurement cycle time through data-driven recommendations.</li>
          <li>Collaborated with IT teams to validate data pipelines and ensure system data consistency.</li>
          <li>Worked alongside procurement and finance teams to align data reporting with business goals and improve data collection processes.</li>
        </ul>
      </div>

      <div className="timeline-item">
        <h3>Junior Web Developer Internship</h3>
        <div className="timeline-date">Oct 2021 - Mar 2022</div>
        <div className="timeline-org">PANTAI BHARU HOLDINGS SDN BHD, Klang, MY</div>
        <ul>
          <li>Collaborated with senior developers to build and maintain internal web applications using HTML, CSS, JavaScript, and PHP.</li>
          <li>Identified and resolved over 20% of frontend bugs in the production system, improving system stability and user experience.</li>
          <li>Developed a cafe food-ordering web app that streamlined the ordering process, reducing wait times by 25%.</li>
          <li>Built a customer information portal for the Proton department using PHP and MySQL, enabling efficient data entry and retrieval.</li>
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
