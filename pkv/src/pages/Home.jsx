import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Navbar */}
      <header className="home-navbar">
        <div className="logo">
          🔐 <span>Personal Knowledge Vault</span>
        </div>
        <nav>
          <Link to="/login" className="btn-outline">Login</Link>
          <Link to="/register" className="btn-primary">Sign Up</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1>Organize Your Knowledge Securely</h1>
          <p>
            Store, manage, and access your personal notes anytime with
            advanced security and smart organization.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn-primary">
              Get Started
            </Link>
            <Link to="/login" className="btn-outline">
              Login
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="/images/hero-illustration.png"
            alt="Knowledge Vault"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature-card">
          🔍 <h3>Smart Search</h3>
          <p>Find your notes instantly using keywords and tags.</p>
        </div>
        <div className="feature-card">
          🔐 <h3>Secure & Private</h3>
          <p>Your notes are encrypted and protected.</p>
        </div>
        <div className="feature-card">
          ☁️ <h3>Cloud Backup</h3>
          <p>Access your knowledge from anywhere.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>© 2026 Personal Knowledge Vault. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
