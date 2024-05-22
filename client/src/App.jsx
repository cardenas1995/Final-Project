import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import ProfilePage from './ProfilePage';
import Exercise from './Exercises';
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


// import React from 'react';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Home from './Home';
// import Login from './Login';
// import Exercise from './Exercises';
// import ProfilePage from './ProfilePage';
// import Activity from './Activity';
// import SignUp from './SignUp';
// import { userLoader, fetchExercisesLoader, profileLoader, activityLoader } from './loaders';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Home />,
//   },
//   {
//     path: '/login',
//     element: <Login />,
//   },
//   {
//     path: '/profile',
//     element: <ProfilePage />,
//     loader: profileLoader,
//   },
//   {
//     path: '/exercises',
//     element: <Exercise />,
//     loader: fetchExercisesLoader,
//   },
//   {
//     path: '/activity',
//     element: <Activity />,
//     loader: activityLoader,
//   },
//   {
//     path: '/signup',
//     element: <SignUp />,
//   },
// ]);

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;



