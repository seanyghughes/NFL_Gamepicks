import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [currentUser] = useState(() => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  });

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to NFL Game Picks</h1>
          <p className="hero-subtitle">
            Test your football knowledge and compete with friends in weekly NFL pick'em contests!
          </p>
          
          {currentUser ? (
            <div className="welcome-user">
              <p>Welcome back, {currentUser.name}!</p>
              <div className="action-buttons">
                <Link to="/games" className="cta-button primary">
                  Make Your Picks
                </Link>
                <Link to="/stats" className="cta-button secondary">
                  View Your Stats
                </Link>
              </div>
            </div>
          ) : (
            <div className="auth-section">
              <p>Join thousands of fans making weekly predictions!</p>
              <div className="action-buttons">
                <Link to="/signup" className="cta-button primary">
                  Get Started
                </Link>
                <Link to="/login" className="cta-button secondary">
                  Sign In
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="features-section">
        <h2>How It Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🏈</div>
            <h3>Make Picks</h3>
            <p>Select your winners for each NFL game every week. Choose wisely - your picks determine your score!</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Track Performance</h3>
            <p>Monitor your accuracy with detailed statistics and see how you stack up against other players.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Join Leagues</h3>
            <p>Create private leagues with friends or join public ones to compete for bragging rights and prizes.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Weekly Rankings</h3>
            <p>See where you rank each week and track your progress throughout the season.</p>
          </div>
        </div>
      </div>

      <div className="stats-preview">
        <h2>Season Highlights</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">1000+</span>
            <span className="stat-label">Active Players</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">18</span>
            <span className="stat-label">Weeks of Action</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">272</span>
            <span className="stat-label">Regular Season Games</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Private Leagues</span>
          </div>
        </div>
      </div>

      {!currentUser && (
        <div className="cta-section">
          <h2>Ready to Start?</h2>
          <p>Join the ultimate NFL pick'em experience today!</p>
          <div className="cta-buttons">
            <Link to="/signup" className="cta-button primary large">
              Create Free Account
            </Link>
            <Link to="/games" className="cta-button secondary large">
              Browse Games
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
