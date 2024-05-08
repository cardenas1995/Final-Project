import React from 'react';
import Profile from './Profile';

function ProfilePage() {
  // Sample weight data
  const weightData = [
    { date: '2024-04-01', weight: 180 },
    { date: '2024-04-05', weight: 178 },
    { date: '2024-04-10', weight: 176 },
    // Add more weight data as needed
  ];

  return (
    <div>
      <Profile weightData={weightData} />
    </div>
  );
}

export default ProfilePage;

