// Navbar.js

import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import NFLlogo from '../images/NFLlogo.svg';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setCurrentUser(null);
    closeMenu();
    navigate('/');
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
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/games" className="navbar-link" onClick={closeMenu}>
              Games
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/stats" className="navbar-link" onClick={closeMenu}>
              Stats
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/league" className="navbar-link" onClick={closeMenu}>
              League
            </Link>
          </li>
          {currentUser ? (
            <>
              <li className="navbar-item user-info">
                <span className="user-name">Hi, {currentUser.name}</span>
              </li>
              <li className="navbar-item">
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/login" className="navbar-link auth-link" onClick={closeMenu}>
                  Login
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/signup" className="navbar-link auth-link" onClick={closeMenu}>
                  Sign Up
                </Link>
              </li>
            </>
          )}
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
