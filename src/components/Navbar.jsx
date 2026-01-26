import React from 'react';

const Navbar = ({ activePage, setActivePage }) => {
    const navItems = ['About', 'Resume', 'Portfolio', 'Contact'];

    const handleClick = (item) => {
        setActivePage(item.toLowerCase());
        const frontPage = document.getElementById('front-page');
        if (frontPage) {
            const targetY = frontPage.offsetHeight;
            const startY = window.pageYOffset;
            const distanceBody = targetY - startY;
            const duration = 1500;
            let startTime = null;

            // Disable native scroll to prevent conflict
            const originalScrollBehavior = document.documentElement.style.scrollBehavior;
            document.documentElement.style.scrollBehavior = 'auto';

            const animation = (currentTime) => {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);

                const ease = progress < 0.5
                    ? 4 * progress * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

                window.scrollTo(0, startY + (distanceBody * ease));

                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                } else {
                    document.documentElement.style.scrollBehavior = originalScrollBehavior;
                }
            };

            requestAnimationFrame(animation);
        }
    };

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                {navItems.map((item) => (
                    <li className="navbar-item" key={item}>
                        <button
                            className={`navbar-link ${activePage === item.toLowerCase() ? 'active' : ''}`}
                            onClick={() => handleClick(item)}
                        >
                            {item}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
