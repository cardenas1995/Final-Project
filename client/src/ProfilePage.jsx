import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-luxon'; // Import the Luxon adapter
import Navbar from './Navbar';
import './Profile.css';

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [weightData, setWeightData] = useState([]);
  const [newWeight, setNewWeight] = useState('');
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    // Fetch user profile data on component mount
    fetch('http://127.0.0.1:5555/profile', { credentials: 'include' })
      .then(response => {
        if (response.status === 401) {
          throw new Error('Unauthorized');
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
    if (!isNaN(updatedWeight)) {
      try {
        const response = await fetch('http://127.0.0.1:5555/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ weight: updatedWeight }),
        });
        if (!response.ok) {
          throw new Error('Failed to log new weight');
        }
        const newWeightLog = {
          date: new Date().toISOString().split('T')[0],
          weight: updatedWeight,
        };
        setWeightData((prevWeightData) => [...prevWeightData, newWeightLog]);
        setNewWeight('');
      } catch (error) {
        console.error('Error logging new weight:', error);
      }
    }
  };

  useEffect(() => {
    if (canvasRef.current && weightData && weightData.length > 0) {
      const ctx = canvasRef.current.getContext('2d');
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Sort weightData by date
      const sortedWeightData = [...weightData].sort((a, b) => new Date(a.date) - new Date(b.date));

      const formattedWeightData = sortedWeightData.map(data => ({
        x: data.date,
        y: data.weight,
      }));
      const goalWeightData = sortedWeightData.map(data => ({
        x: data.date,
        y: userData.goal_weight,
      }));

      chartRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          datasets: [
            {
              label: 'Weight (lbs)',
              data: formattedWeightData,
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
              tension: 0.1,
              fill: false,
            },
            {
              label: 'Weight Goal',
              data: goalWeightData,
              borderColor: 'rgba(0, 0, 139, 1)', // Blue color
              backgroundColor: 'rgba(0, 0, 139, 0.2)', // Blue color with transparency
              borderDash: [5, 5],
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
              },
              title: {
                display: true,
                text: 'Date',
                color: '#fff', // Set the x-axis title color to white
                font: {
                  size: 20, // Increase the x-axis title font size
                },
              },
              ticks: {
                color: '#fff', // Set the x-axis tick color to white
                font: {
                  size: 16, // Increase the x-axis tick font size
                },
                autoSkip: true, // Enable autoSkip to avoid overlapping labels
                maxTicksLimit: 10, // Limit the number of ticks to display
              },
              afterBuildTicks: function (scale) {
                const end = new Date(scale.max).setDate(new Date(scale.max).getDate() + 2);
                scale.max = new Date(end);
              },
            },
            y: {
              beginAtZero: false,
              title: {
                display: true,
                text: 'Weight (lbs)',
                color: '#fff', // Set the y-axis title color to white
                font: {
                  size: 20, // Increase the y-axis title font size
                },
              },
              ticks: {
                color: '#fff', // Set the y-axis tick color to white
                font: {
                  size: 16, // Increase the y-axis tick font size
                },
              },
            },
          },
          responsive: true,
          plugins: {
            legend: {
              display: true,
              labels: {
                color: '#fff', // Set the legend label color to white
                font: {
                  size: 16, // Increase the legend label font size
                },
              },
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  label += context.raw.y;
                  return label;
                },
                title: function (context) {
                  return context[0].label.split('T')[0]; // Display only the date part
                },
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [weightData, userData]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <Navbar />
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

export default ProfilePage;



