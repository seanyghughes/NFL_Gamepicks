// Navbar.js

import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import NFLlogo from '../images/NFLlogo.svg';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
      <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src={NFLlogo} alt="NFL logo" className="navbar-logo-img" />
        </Link>
        <div className={`navbar-menu ${isOpen ? 'open' : ''}`}>
          <li className="navbar-item">
            <Link to="/" className="navbar-link" onClick={closeMenu}>
            Home</Link>
          </li>
          <li className="navbar-item">
          <Link to="/Games" className="navbar-link" onClick={closeMenu}>
          Games</Link>
          </li>
          <li className="navbar-item">
          <Link to="/Stats" className="navbar-link" onClick={closeMenu}>
          Stats</Link>
          </li>
          <li className="navbar-item">
          <Link to="/League" className="navbar-link" onClick={closeMenu}>
          League</Link>
          </li>
        </div>
        <div className={`burger ${isOpen ? 'toggle' : ''}`} onClick={toggleMenu}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
