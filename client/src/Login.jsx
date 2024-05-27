import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5555/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        }),
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError('Invalid email or password');
        } else {
          setError('Login failed, please try again');
        }
        return;
      }

      const data = await response.json();
      console.log('Login successful:', data);
      navigate('/'); // Redirect to the home page
    } catch (error) {
      console.error('Login failed:', error.message);
      setError('An error occurred, please try again');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Log In</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

