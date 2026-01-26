import React from 'react';

const FrontPage = ({ onExplore }) => {
    return (
        <section className="front-page" id="front-page">
            <div className="front-page-content">
                <h1 className="front-page-title">Welcome</h1>
                <p className="front-page-subtitle">I'm Muhamad Imran</p>
                <p className="front-page-description">AI Engineer & Web Developer</p>
                <button className="front-page-btn" id="explore-btn" onClick={onExplore}>
                    <span>Explore More</span>
                    <ion-icon name="chevron-down-outline"></ion-icon>
                </button>
            </div>
        </section>
    );
};

export default FrontPage;
