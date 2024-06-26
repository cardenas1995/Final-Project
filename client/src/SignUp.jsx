import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [weightGoal, setWeightGoal] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming your Flask backend is running on localhost:5000
      const response = await axios.post('http://localhost:5000/register', {
        name,
        email,
        password,
        height,
        weight,
        goal_weight: weightGoal
      });
      console.log('Registration successful:', response.data);
      // Redirect user or clear form here, based on your needs
    } catch (error) {
      console.error('Registration failed:', error.response ? error.response.data : 'No response');
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
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
        <div className="form-group">
          <label htmlFor="height">Height (in cm):</label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="weight">Weight (in kg):</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="weightGoal">Weight Goal (in kg):</label>
          <input
            type="number"
            id="weightGoal"
            value={weightGoal}
            onChange={(e) => setWeightGoal(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      <p className="signup-login-link">Already have an account? <Link to="/login">Log in</Link></p>
    </div>
  );
}

export default SignUp;