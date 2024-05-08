import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import axios from 'axios';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', { username, password });
      console.log('Login successful:', response.data);
      // Redirect the user to their profile page or perform other actions upon successful login
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <Link to="/" className="logo-link"> {/* Add Link component for the logo */}
        <img src="/path_to_your_logo.png" alt="Logo" className="logo" />
      </Link>
      <h2 className="login-title">Log In</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-button">Log In</button>
      </form>
    </div>
  );
}

export default Login;
