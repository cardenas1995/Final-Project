// import React, { useRef, useEffect, useState } from 'react';
// import Chart from 'chart.js/auto';
// import Navbar from './Navbar';
// import './Profile.css';

// function Profile({ weightData }) {
//   const [newWeight, setNewWeight] = useState('');
//   const weightGoal = 165;
//   const canvasRef = useRef(null);
//   const chartRef = useRef(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const updatedWeight = parseInt(newWeight);
//     if (isNaN(updatedWeight)) {
//       setNewWeight(''); // Clear the input field if the input is invalid
//       return;
//     }
//     const newWeightData = {
//       date: new Date().toISOString().split('T')[0],
//       weight: updatedWeight
//     };
//     weightData.push(newWeightData); // Add new weight data to the state
//     setNewWeight(''); // Clear the input field after submission
//   };

//   useEffect(() => {
//     if (canvasRef.current && weightData && weightData.length > 0) {
//       const ctx = canvasRef.current.getContext('2d');
//       if (chartRef.current) {
//         chartRef.current.destroy();
//       }

//       chartRef.current = new Chart(ctx, {
//         type: 'line',
//         data: {
//           labels: weightData.map(data => data.date),
//           datasets: [{
//             label: 'Weight (lbs)',
//             data: weightData.map(data => data.weight),
//             borderColor: 'rgb(75, 192, 192)',
//             backgroundColor: 'rgba(75, 192, 192, 0.5)',
//             tension: 0.1,
//             fill: false
//           }]
//         },
//         options: {
//           scales: {
//             y: {
//               beginAtZero: false
//             }
//           },
//           responsive: true,
//           plugins: {
//             legend: {
//               display: true
//             }
//           }
//         }
//       });
//     }

//     return () => {
//       if (chartRef.current) {
//         chartRef.current.destroy();
//       }
//     };
//   }, [weightData]);  // Depend on weightData to redraw the chart when it updates

//   return (
//     <div className="profile">
//       <Navbar />
//       <header className="header">
//         <h1 className="profile-title">Kevin</h1>
//       </header>
//       <div className="profile-info">
//         <div className="detail">
//           <span className="label">Height:</span>
//           <span className="value">6'2"</span>
//         </div>
//         <div className="detail">
//           <span className="label">Current Weight:</span>
//           <span className="value">180 lbs</span>
//         </div>
//         <div className="detail">
//           <span className="label">Weight Goal:</span>
//           <span className="value">{weightGoal} lbs</span>
//         </div>
//       </div>
//       <div className="weight-input">
//         <h2 className="input-title">Today's Weight</h2>
//         <input
//           type="number"
//           className="weight-field"
//           placeholder="Enter weight in lbs"
//           value={newWeight}
//           onChange={e => setNewWeight(e.target.value)}
//           autoComplete="off"
//         />
//         <button className="submit-button" onClick={handleSubmit}>Submit</button>
//       </div>
//       <div className="weight-chart">
//         <h2 className="chart-title">Weight Progression</h2>
//         <canvas ref={canvasRef}></canvas>
//       </div>
//     </div>
//   );
// }

// export default Profile;


// import React, { useRef, useEffect, useState } from 'react';
// import Chart from 'chart.js/auto';
// import Navbar from './Navbar';
// import './Profile.css';

// function Profile({ weightData, userData }) {
//   const [newWeight, setNewWeight] = useState('');
//   const canvasRef = useRef(null);
//   const chartRef = useRef(null);
//   const weightGoal = userData.goal_weight;

//   // Function to draw a star on the graph
//   function drawStar(ctx, x, y, spikes, outerRadius, innerRadius) {
//     ctx.save();
//     ctx.fillStyle = '#FFD700'; // Gold color
//     ctx.beginPath();
//     ctx.translate(x, y);
//     ctx.moveTo(0,0 - outerRadius);
//     for (let i = 0; i < spikes; i++) {
//       ctx.lineTo(0, 0 - (outerRadius * innerRadius));
//       ctx.rotate(Math.PI / spikes);
//       ctx.lineTo(0, 0 - outerRadius);
//       ctx.rotate(Math.PI / spikes);
//     }
//     ctx.fill();
//     ctx.restore();
//   }

//   useEffect(() => {
//     if (canvasRef.current && weightData && weightData.length > 0) {
//       const ctx = canvasRef.current.getContext('2d');
//       if (chartRef.current) {
//         chartRef.current.destroy();
//       }
//       chartRef.current = new Chart(ctx, {
//         type: 'line',
//         data: {
//           labels: weightData.map(data => data.date),
//           datasets: [{
//             label: 'Weight (lbs)',
//             data: weightData.map(data => data.weight),
//             fill: false,
//             borderColor: 'rgb(75, 192, 192)',
//             tension: 0.1,
//             pointRadius: weightData.map(data => data.weight === weightGoal ? 5 : 3),
//             pointStyle: weightData.map(data => {
//               if (data.weight === weightGoal) {
//                 return ctx => {
//                   drawStar(ctx, ctx.x, ctx.y, 5, 8, 4);
//                 };
//               }
//               return 'circle';
//             }),
//             backgroundColor: weightData.map(data => data.weight === weightGoal ? '#FFD700' : '#007bff'),
//           }]
//         },
//         options: {
//           scales: {
//             y: {
//               beginAtZero: false
//             }
//           },
//           plugins: {
//             legend: {
//               display: true
//             }
//           }
//         }
//       });
//     }

//     return () => {
//       if (chartRef.current) {
//         chartRef.current.destroy();
//       }
//     };
//   }, [weightData]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const updatedWeight = parseFloat(newWeight);
//     if (!isNaN(updatedWeight)) {
//       try {
//         const response = await fetch('http://127.0.0.1:5555/profile', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           credentials: 'include',
//           body: JSON.stringify({ weight: updatedWeight }),
//         });
//         if (!response.ok) {
//           throw new Error('Failed to log new weight');
//         }
//         const newWeightLog = {
//           date: new Date().toISOString().split('T')[0],
//           weight: updatedWeight,
//         };
//         setWeightData([...weightData, newWeightLog]);
//         setNewWeight('');
//       } catch (error) {
//         console.error('Error logging new weight:', error);
//       }
//     }
//   };

//   return (
//     <div className="profile">
//       <Navbar />
//       <header className="header">
//         <h1 className="profile-title">Profile Details</h1>
//         <div className="profile-info">
//           <div className="detail">
//             <span className="label">Height:</span>
//             <span className="value">{userData.height} inches</span>
//           </div>
//           <div className="detail">
//             <span className="label">Current Weight:</span>
//             <span className="value">{userData.weight} lbs</span>
//           </div>
//           <div className="detail">
//             <span className="label">Weight Goal:</span>
//             <span className="value">{weightGoal} lbs</span>
//           </div>
//         </div>
//       </header>
//       <div className="weight-input">
//         <h2 className="input-title">Today's Weight</h2>
//         <input
//           type="number"
//           className="weight-field"
//           placeholder="Enter weight in lbs"
//           value={newWeight}
//           onChange={e => setNewWeight(e.target.value)}
//           autoComplete="off"
//         />
//         <button className="submit-button" onClick={handleSubmit}>Submit</button>
//       </div>
//       <div className="weight-chart">
//         <h2 className="chart-title">Weight Progression</h2>
//         <canvas ref={canvasRef}></canvas>
//       </div>
//     </div>
//   );
// }

// export default Profile;







// import React, { useRef, useEffect, useState } from 'react';
// import Chart from 'chart.js/auto';
// import Navbar from './Navbar';
// import './Profile.css';

// function Profile() {
//   const [userData, setUserData] = useState(null);
//   const [weightData, setWeightData] = useState([]);
//   const [newWeight, setNewWeight] = useState('');
//   const canvasRef = useRef(null);
//   const chartRef = useRef(null);

//   useEffect(() => {
//     // Fetch user profile data on component mount
//     fetch('http://127.0.0.1:5555/profile', { credentials: 'include' })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch profile');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setUserData(data.user);
//         setWeightData(data.user.weight_logs);
//       })
//       .catch(error => {
//         console.error('Error fetching profile data:', error);
//       });
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const updatedWeight = parseFloat(newWeight);
//     if (isNaN(updatedWeight)) {
//       setNewWeight(''); // Clear the input field if the input is invalid
//       return;
//     }
//     try {
//       const response = await fetch('http://127.0.0.1:5555/profile', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ weight: updatedWeight }),
//         credentials: 'include',
//       });
//       if (!response.ok) {
//         throw new Error('Failed to log weight');
//       }
//       const newWeightData = {
//         date: new Date().toISOString().split('T')[0],
//         weight: updatedWeight,
//       };
//       setWeightData([...weightData, newWeightData]); // Add new weight data to the state
//       setUserData({ ...userData, weight: updatedWeight }); // Update current weight
//       setNewWeight(''); // Clear the input field after submission
//     } catch (error) {
//       console.error('Error logging new weight:', error);
//     }
//   };

//   useEffect(() => {
//     if (canvasRef.current && weightData.length > 0) {
//       const ctx = canvasRef.current.getContext('2d');
//       if (chartRef.current) {
//         chartRef.current.destroy();
//       }

//       chartRef.current = new Chart(ctx, {
//         type: 'line',
//         data: {
//           labels: weightData.map(data => data.date),
//           datasets: [{
//             label: 'Weight (lbs)',
//             data: weightData.map(data => data.weight),
//             borderColor: 'rgb(75, 192, 192)',
//             backgroundColor: 'rgba(75, 192, 192, 0.5)',
//             tension: 0.1,
//             fill: false
//           }]
//         },
//         options: {
//           scales: {
//             y: {
//               beginAtZero: false
//             }
//           },
//           responsive: true,
//           plugins: {
//             legend: {
//               display: true
//             }
//           }
//         }
//       });
//     }

//     return () => {
//       if (chartRef.current) {
//         chartRef.current.destroy();
//       }
//     };
//   }, [weightData]);

//   if (!userData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="profile">
//       <Navbar />
//       <header className="header">
//         <h1 className="profile-title">{userData.name}</h1>
//       </header>
//       <div className="profile-info">
//         <div className="detail">
//           <span className="label">Height:</span>
//           <span className="value">{userData.height} inches</span>
//         </div>
//         <div className="detail">
//           <span className="label">Current Weight:</span>
//           <span className="value">{userData.weight} lbs</span>
//         </div>
//         <div className="detail">
//           <span className="label">Weight Goal:</span>
//           <span className="value">{userData.goal_weight} lbs</span>
//         </div>
//       </div>
//       <div className="weight-input">
//         <h2 className="input-title">Today's Weight</h2>
//         <input
//           type="number"
//           className="weight-field"
//           placeholder="Enter weight in lbs"
//           value={newWeight}
//           onChange={e => setNewWeight(e.target.value)}
//           autoComplete="off"
//         />
//         <button className="submit-button" onClick={handleSubmit}>Submit</button>
//       </div>
//       <div className="weight-chart">
//         <h2 className="chart-title">Weight Progression</h2>
//         <canvas ref={canvasRef}></canvas>
//       </div>
//     </div>
//   );
// }

// export default Profile;




// import React, { useRef, useEffect, useState } from 'react';
// import Chart from 'chart.js/auto';
// import Navbar from './Navbar';
// import './Profile.css';

// function Profile() {
//   const [userData, setUserData] = useState(null);
//   const [weightData, setWeightData] = useState([]);
//   const [newWeight, setNewWeight] = useState('');
//   const canvasRef = useRef(null);
//   const chartRef = useRef(null);

//   useEffect(() => {
//     // Fetch user profile data on component mount
//     fetch('http://127.0.0.1:5555/profile', { credentials: 'include' })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch profile');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setUserData(data.user);
//         setWeightData(data.user.weight_logs);
//       })
//       .catch(error => {
//         console.error('Error fetching profile data:', error);
//       });
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const updatedWeight = parseFloat(newWeight);
//     if (isNaN(updatedWeight)) {
//       setNewWeight(''); // Clear the input field if the input is invalid
//       return;
//     }
//     try {
//       const response = await fetch('http://127.0.0.1:5555/profile', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ weight: updatedWeight }),
//         credentials: 'include',
//       });
//       if (!response.ok) {
//         throw new Error('Failed to log weight');
//       }
//       const newWeightData = {
//         date: new Date().toISOString().split('T')[0],
//         weight: updatedWeight,
//       };
//       setWeightData([...weightData, newWeightData]); // Add new weight data to the state
//       setUserData({ ...userData, weight: updatedWeight }); // Update current weight
//       setNewWeight(''); // Clear the input field after submission
//     } catch (error) {
//       console.error('Error logging new weight:', error);
//     }
//   };

//   useEffect(() => {
//     if (canvasRef.current && weightData.length > 0) {
//       const ctx = canvasRef.current.getContext('2d');
//       if (chartRef.current) {
//         chartRef.current.destroy();
//       }

//       chartRef.current = new Chart(ctx, {
//         type: 'line',
//         data: {
//           labels: weightData.map(data => data.date),
//           datasets: [{
//             label: 'Weight (lbs)',
//             data: weightData.map(data => data.weight),
//             borderColor: 'rgb(75, 192, 192)',
//             backgroundColor: 'rgba(75, 192, 192, 0.5)',
//             tension: 0.1,
//             fill: false
//           }]
//         },
//         options: {
//           scales: {
//             y: {
//               beginAtZero: false
//             }
//           },
//           responsive: true,
//           plugins: {
//             legend: {
//               display: true
//             }
//           }
//         }
//       });
//     }

//     return () => {
//       if (chartRef.current) {
//         chartRef.current.destroy();
//       }
//     };
//   }, [weightData]);

//   if (!userData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="profile">
//       <Navbar />
//       <header className="header">
//         <h1 className="profile-title">{userData.name}</h1>
//       </header>
//       <div className="profile-info">
//         <div className="detail">
//           <span className="label">Height:</span>
//           <span className="value">{userData.height} inches</span>
//         </div>
//         <div className="detail">
//           <span className="label">Current Weight:</span>
//           <span className="value">{userData.weight} lbs</span>
//         </div>
//         <div className="detail">
//           <span className="label">Weight Goal:</span>
//           <span className="value">{userData.goal_weight} lbs</span>
//         </div>
//       </div>
//       <div className="weight-input">
//         <h2 className="input-title">Today's Weight</h2>
//         <input
//           type="number"
//           className="weight-field"
//           placeholder="Enter weight in lbs"
//           value={newWeight}
//           onChange={e => setNewWeight(e.target.value)}
//           autoComplete="off"
//         />
//         <button className="submit-button" onClick={handleSubmit}>Submit</button>
//       </div>
//       <div className="weight-chart">
//         <h2 className="chart-title">Weight Progression</h2>
//         <canvas ref={canvasRef}></canvas>
//       </div>
//     </div>
//   );
// }

// export default Profile;






import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import Navbar from './Navbar';
import './Profile.css';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [weightData, setWeightData] = useState([]);
  const [newWeight, setNewWeight] = useState('');
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    // Fetch user profile data on component mount
    fetch('http://127.0.0.1:5555/profile', { credentials: 'include' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        return response.json();
      })
      .then(data => {
        setUserData(data.user);
        setWeightData(data.user.weight_logs);
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedWeight = parseFloat(newWeight);
    if (isNaN(updatedWeight)) {
      setNewWeight(''); // Clear the input field if the input is invalid
      return;
    }
    try {
      const response = await fetch('http://127.0.0.1:5555/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ weight: updatedWeight }),
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to log weight');
      }
      const newWeightData = {
        date: new Date().toISOString().split('T')[0],
        weight: updatedWeight,
      };
      setWeightData([...weightData, newWeightData]); // Add new weight data to the state
      setUserData({ ...userData, weight: updatedWeight }); // Update current weight in userData
      setNewWeight(''); // Clear the input field after submission
    } catch (error) {
      console.error('Error logging new weight:', error);
    }
  };

  useEffect(() => {
    if (canvasRef.current && weightData.length > 0) {
      const ctx = canvasRef.current.getContext('2d');
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: weightData.map(data => data.date),
          datasets: [{
            label: 'Weight (lbs)',
            data: weightData.map(data => data.weight),
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            tension: 0.1,
            fill: false
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: false
            }
          },
          responsive: true,
          plugins: {
            legend: {
              display: true
            }
          }
        }
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [weightData]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <Navbar />
      <header className="header">
        <h1 className="profile-title">{userData.name}</h1>
      </header>
      <div className="profile-info">
        <div className="detail">
          <span className="label">Height:</span>
          <span className="value">{userData.height} inches</span>
        </div>
        <div className="detail">
          <span className="label">Current Weight:</span>
          <span className="value">{userData.weight} lbs</span>
        </div>
        <div className="detail">
          <span className="label">Weight Goal:</span>
          <span className="value">{userData.goal_weight} lbs</span>
        </div>
      </div>
      <div className="weight-input">
        <h2 className="input-title">Today's Weight</h2>
        <input
          type="number"
          className="weight-field"
          placeholder="Enter weight in lbs"
          value={newWeight}
          onChange={e => setNewWeight(e.target.value)}
          autoComplete="off"
        />
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </div>
      <div className="weight-chart">
        <h2 className="chart-title">Weight Progression</h2>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}

export default Profile;
