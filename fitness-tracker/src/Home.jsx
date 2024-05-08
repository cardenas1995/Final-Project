// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Navbar from './Navbar'; // Import your navbar component

function Home() {
  return (
    <div className="home">
      {/* Navbar */}
      <Navbar />

      {/* Background with content */}
      <div className="home-background">
        <div className="home-content">
          <section className="hero-section">
            <div className="hero-content">
              <h1 className="hero-title"><p className="hero-description">Start Your Fitness Journey Today </p></h1>
            </div>
          </section>
          <section className="info-section">
            <Link to="/signup" className="hero-button">Get Started</Link> {/* Updated the Link to navigate to the SignUp page */}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Home;


