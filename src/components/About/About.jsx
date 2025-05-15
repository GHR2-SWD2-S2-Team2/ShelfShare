import React from 'react';
import '../../App.css';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <div className="about-hero-content">
          <h1>About ShelfShare</h1>
          <p className="hero-text">
            ShelfShare is an online book space where readers discover, share, and connect over great books.
            We offer a curated selection across genres and give readers a voice to recommend and explore stories together.
            It's more than a bookstore — it's your shared shelf.
          </p>
        </div>
      </div>

      <div className="about-content">
        <section className="mission-section">
          <div className="section-icon">
            <i className="bi bi-bookmark-star"></i>
          </div>
          <h2>Our Mission</h2>
          <p>
            To create a seamless and enjoyable experience for book enthusiasts to manage their
            collections, discover new reads, and connect with fellow readers.
          </p>
        </section>

        <section className="features-section">
          <div className="section-icon">
            <i className="bi bi-grid-3x3-gap"></i>
          </div>
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-item">
              <i className="bi bi-book"></i>
              <h3>Digital Library Management</h3>
              <p>Organize your books effortlessly</p>
            </div>
            <div className="feature-item">
              <i className="bi bi-collection"></i>
              <h3>Book Tracking</h3>
              <p>Keep track of your reading progress</p>
            </div>
            <div className="feature-item">
              <i className="bi bi-graph-up"></i>
              <h3>Reading Statistics</h3>
              <p>Visualize your reading journey</p>
            </div>
            <div className="feature-item">
              <i className="bi bi-people"></i>
              <h3>Community Features</h3>
              <p>Connect with fellow book lovers</p>
            </div>
          </div>
        </section>

        <section className="contact-section">
          <div className="section-icon">
            <i className="bi bi-envelope-paper"></i>
          </div>
          <h2>Get in Touch</h2>
          <p>
            Have questions or suggestions? We'd love to hear from you!
            Contact us at <a href="mailto:contact@shelfshare.com">contact@shelfshare.com</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default About; 