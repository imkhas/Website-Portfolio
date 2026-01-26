import React, { useState, useEffect } from 'react';
import './style.css';
import './portfolio_redesign.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import FrontPage from './components/FrontPage';
import About from './components/pages/About';
import Resume from './components/pages/Resume';
import Portfolio from './components/pages/Portfolio';
import Contact from './components/pages/Contact';

function App() {
  const [activePage, setActivePage] = useState('about');
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const slowSmoothScroll = (targetY, duration) => {
    const startY = window.pageYOffset;
    const distanceBody = targetY - startY;
    let startTime = null;

    // Temporarily disable native smooth scroll to avoid conflicts
    const originalScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // EaseInOutCubic function
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startY + (distanceBody * ease));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        // Restore original scroll behavior
        document.documentElement.style.scrollBehavior = originalScrollBehavior;
      }
    };

    requestAnimationFrame(animation);
  };

  const scrollToContent = () => {
    const frontPage = document.getElementById('front-page');
    if (frontPage) {
      slowSmoothScroll(frontPage.offsetHeight, 1500); // 1.5 seconds
    }
  };

  // Sidebar toggle logic
  useEffect(() => {
    const sidebarBtn = document.querySelector('[data-sidebar-btn]');
    const sidebar = document.querySelector('[data-sidebar]');

    const handleSidebarToggle = () => {
      setIsSidebarActive(!isSidebarActive);
      sidebar.classList.toggle('active');
    };

    if (sidebarBtn) {
      sidebarBtn.addEventListener('click', handleSidebarToggle);
    }

    return () => {
      if (sidebarBtn) {
        sidebarBtn.removeEventListener('click', handleSidebarToggle);
      }
    };
  }, [isSidebarActive]);

  // Form validation logic (simplified port)
  useEffect(() => {
    const form = document.querySelector('[data-form]');
    const formInputs = document.querySelectorAll('[data-form-input]');
    const formBtn = document.querySelector('[data-form-btn]');

    const handleInput = () => {
      if (form && form.checkValidity()) {
        formBtn.removeAttribute('disabled');
      } else if (formBtn) {
        formBtn.setAttribute('disabled', '');
      }
    };

    formInputs.forEach(input => {
      input.addEventListener('input', handleInput);
    });

    return () => {
      formInputs.forEach(input => {
        input.removeEventListener('input', handleInput);
      });
    };
  }, [activePage]);

  const renderPage = () => {
    switch (activePage) {
      case 'about':
        return <About />;
      case 'resume':
        return <Resume />;
      case 'portfolio':
        return <Portfolio />;
      case 'contact':
        return <Contact />;
      default:
        return <About />;
    }
  };

  return (
    <>
      <FrontPage onExplore={scrollToContent} />
      <main id="main-content">
        <Sidebar />
        <div className="main-content">
          <Navbar activePage={activePage} setActivePage={setActivePage} />
          {renderPage()}
        </div>
      </main>
    </>
  );
}

export default App;
