import React from 'react';
import './About.css';
import Navbar from './Navbar';

function About() {
  return (
    <div className="about-page">
      <Navbar />
      <div className="about-content">
        <h1>About Our Fitness Tracker</h1>
        <p>
          Our web application is a comprehensive fitness tracker designed to empower individuals on their journey to an optimal physique. By enabling users to log and monitor their exercises, our app ensures that no muscle group is neglected, promoting balanced muscle development. The platform's visual progress tracking feature allows users to see their weight fluctuations over time, providing valuable insights into their fitness progression. This holistic approach helps users stay motivated, achieve their fitness goals, and maintain a well-rounded workout routine.
        </p>
      </div>
    </div>
  );
}

export default About;
