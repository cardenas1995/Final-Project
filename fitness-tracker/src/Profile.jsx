import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import Navbar from './Navbar';
import './Profile.css';

function Profile({ weightData }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const weightGoal = 165; // Define the weight goal for the star marker

  // Function to draw a star on the graph
  function drawStar(ctx, x, y, spikes, outerRadius, innerRadius) {
    ctx.save();
    ctx.fillStyle = '#FFD700'; // Gold color
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.moveTo(0,0 - outerRadius);
    for (let i = 0; i < spikes; i++) {
      ctx.lineTo(0, 0 - (outerRadius * innerRadius));
      ctx.rotate(Math.PI / spikes);
      ctx.lineTo(0, 0 - outerRadius);
      ctx.rotate(Math.PI / spikes);
    }
    ctx.fill();
    ctx.restore();
  }

  useEffect(() => {
    if (canvasRef.current && weightData && weightData.length > 0) {
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
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            pointRadius: weightData.map(data => data.weight === weightGoal ? 5 : 3),
            pointStyle: weightData.map(data => {
              if (data.weight === weightGoal) {
                return ctx => {
                  drawStar(ctx, ctx.x, ctx.y, 5, 8, 4);
                };
              }
              return 'circle';
            }),
            backgroundColor: weightData.map(data => data.weight === weightGoal ? '#FFD700' : '#007bff'),
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: false
            }
          },
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

  return (
    <div className="profile">
      <Navbar />
      <header className="header">
        <h1 className="profile-title">Profile Details</h1>
        <div className="profile-info">
          <div className="detail">
            <span className="label">Height:</span>
            <span className="value">6'2"</span>
          </div>
          <div className="detail">
            <span className="label">Current Weight:</span>
            <span className="value">180 lbs</span>
          </div>
          <div className="detail">
            <span className="label">Weight Goal:</span>
            <span className="value">{weightGoal} lbs</span>
          </div>
        </div>
      </header>
      <div className="weight-input">
        <h2 className="input-title">Today's Weight</h2>
        <input type="text" className="weight-field" placeholder="Enter weight in lbs" autoComplete="off" />
        <button className="submit-button">Submit</button>
      </div>
      <div className="weight-chart">
        <h2 className="chart-title">Weight Progression</h2>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}

export default Profile;
