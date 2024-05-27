import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user }) {
  const getNavLinkClass = ({ isActive }) => isActive ? 'active-link' : '';

  return (
    <nav className="navbar">
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
          <NavLink to="/about" className={getNavLinkClass}>About</NavLink>
        </li>
      </ul>
      {user ? (
        <div className="user-greeting">
          <span>Hello, {user.name}</span>
          <NavLink to="/logout" className={getNavLinkClass + " join-button"}>Logout</NavLink>
        </div>
      ) : (
        <NavLink to="/login" className={getNavLinkClass + " join-button"}>Login</NavLink>
      )}
    </nav>
  );
}

export default Navbar;
