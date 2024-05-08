import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import ProfilePage from './ProfilePage';
import Exercise from './Exercise';
import Activity from './Activity';
import SignUp from './SignUp'; // Import the SignUp component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/exercises" element={<Exercise />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/signup" element={<SignUp />} /> {/* New route for SignUp */}
      </Routes>
    </Router>
  );
}

export default App;


