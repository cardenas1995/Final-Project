// Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink instead of Link
import './Navbar.css';

function Navbar() {
  // Function to determine the class based on the active state
  const getNavLinkClass = ({ isActive }) => isActive ? 'active-link' : '';

  return (
    <nav className="navbar">
      {/* Use NavLink for the logo if you want active styling or keep Link if not needed */}
      <NavLink to="/" className={({ isActive }) => isActive ? 'navbar-logo active-link' : 'navbar-logo'}>Fitness Tracker</NavLink>
      <ul className="navbar-menu">
        <li>
          <NavLink to="/profile" className={getNavLinkClass}>Profile</NavLink>
        </li>
        <li>
          <NavLink to="/exercises" className={getNavLinkClass}>Exercises</NavLink>
        </li>
        <li>
          <NavLink to="/activity" className={getNavLinkClass}>Activity</NavLink>
        </li>
        <li>
          {/* Update or keep as a regular link based on your requirements */}
          <NavLink to="/about" className={getNavLinkClass}>About</NavLink>
        </li>
      </ul>
      <NavLink to="/login" className={getNavLinkClass + " join-button"}>Login</NavLink>
    </nav>
  );
}

export default Navbar;
