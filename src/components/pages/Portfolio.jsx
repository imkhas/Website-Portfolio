import React, { useState } from 'react';

const Portfolio = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [isSelectOpen, setIsSelectOpen] = useState(false);

    const projects = [
        {
            title: 'Cepat-Hire',
            category: 'web development',
            owner: 'Muhamad Imran',
            img: '/assets/images/project-1.png',
            link: 'https://cepat-hire.vercel.app/'
        },
        {
            title: 'Optimization Algorithms',
            category: 'machine learning / optimization',
            owner: 'Muhamad Imran',
            img: '/assets/images/project-2.png',
            link: 'https://github.com/imkhas/OPTIMIZATION.git'
        },
        {
            title: 'Flight Price Prediction',
            category: 'machine learning / optimization',
            owner: 'Muhamad Imran',
            img: '/assets/images/project-3.png',
            link: 'https://github.com/imkhas/Flight_prediction_project.git'
        },
        {
            title: 'Flight Distance Analysis',
            category: 'machine learning / optimization',
            owner: 'Muhamad Imran',
            img: '/assets/images/project-4.png',
            link: 'https://github.com/imkhas/Flight-Distance.git'
        },
        {
            title: 'Machine Learning Projects',
            category: 'machine learning / optimization',
            owner: 'Muhamad Imran',
            img: '/assets/images/project-5.png',
            link: 'https://github.com/imkhas/Machine-Learning.git'
        },
        {
            title: 'Smart Internal Workflow Approval System',
            category: 'web development',
            owner: 'Muhamad Imran',
            img: '/assets/images/project-9.png',
            link: 'https://github.com/imkhas/smart-workflow-system.git'
        },
        {
            title: 'Workflow Studio: AI-Powered Automation Engine',
            category: 'web development',
            owner: 'Muhamad Imran',
            img: '/assets/images/project-8.png',
            link: 'https://github.com/Wafiqsw/ai-workflow-generator.git'
        },
        {
            title: 'Billionaire Analysis Dashboard',
            category: 'dashboards',
            owner: 'Muhamad Imran',
            img: '/assets/images/project-6.png',
            link: 'https://app.powerbi.com/groups/fe835936-cc11-4061-89c4-5924966959ca/reports/d6bff540-6a8a-4e6c-ac8b-035ec2944f2a?ctid=cdcbb0e2-9fea-4f54-8670-672707797ada&pbi_source=linkShare&bookmarkGuid=e71d4f51-5a58-42b4-b8c1-927ec4381aeb'
        },
        {
            title: 'Cat Disease Diagnosis',
            category: 'web development',
            owner: 'Muhamad Imran',
            img: '/assets/images/project-7.png',
            link: 'https://catsdiagnose.vercel.app'
        }
    ];

    const categories = ['all', 'machine learning / optimization', 'dashboards', 'web development'];

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(project => project.category === activeFilter);

    return (
        <article className="portfolio active" data-page="portfolio">
            <header>
                <h2 className="h2 article-title">My Projects</h2>
            </header>

            <section className="projects">
                {/* Mobile Filter Select */}
                <div className="filter-select-box">
                    <button
                        className={`filter-select ${isSelectOpen ? 'active' : ''}`}
                        onClick={() => setIsSelectOpen(!isSelectOpen)}
                    >
                        <div className="select-value">
                            {activeFilter === 'all' ? 'Select category' : activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}
                        </div>
                        <div className="select-icon">
                            <ion-icon name="chevron-down"></ion-icon>
                        </div>
                    </button>

                    <ul className="select-list">
                        {categories.map((cat) => (
                            <li className="select-item" key={cat + "-select"}>
                                <button onClick={() => { setActiveFilter(cat); setIsSelectOpen(false); }}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Desktop/Tablet Filter Pills */}
                <ul className="filter-pills">
                    {categories.map((cat) => (
                        <li className="filter-item" key={cat + "-pill"}>
                            <button
                                className={`filter-pill ${activeFilter === cat ? 'active' : ''}`}
                                onClick={() => setActiveFilter(cat)}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="project-grid">
                    {filteredProjects.map((project, index) => (
                        <div className="project-card" key={index}>
                            <figure className="card-banner">
                                <img src={project.img} alt={project.title} loading="lazy" />
                            </figure>

                            <div className="card-content">
                                <h3 className="card-title">{project.title}</h3>

                                <div className="card-footer">
                                    <div className="card-meta">
                                        <div className="meta-item">
                                            <ion-icon name="person-outline"></ion-icon>
                                            <span>{project.owner}</span>
                                        </div>
                                        <div className="meta-item">
                                            <ion-icon name="grid-outline"></ion-icon>
                                            <span>{project.category}</span>
                                        </div>
                                    </div>

                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="card-link">
                                        <ion-icon name="arrow-forward-outline"></ion-icon>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </article>
    );
};

export default Portfolio;
