// BottomNavbar.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './BottomNavbar.css';

function BottomNavbar() {
  return (
    <nav className="bottom-navbar">
      <div className="contact-info">
        <p>Powered by Sean Hughes.</p>
      </div>
      <div className="social-links">
        <a href="https://github.com/seanyghughes" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </a>
        <a href="https://www.linkedin.com/in/sg-hughes/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </a>
      </div>
    </nav>
  );
}

export default BottomNavbar;
