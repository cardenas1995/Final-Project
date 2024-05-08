// Activity.jsx
import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isToday } from 'date-fns';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navbar component
import './Activity.css';

function Activity() {
  const [selectedDates, setSelectedDates] = useState([]);
  const [exerciseLogs, setExerciseLogs] = useState({});
  const [weightLogs, setWeightLogs] = useState({});
  const location = useLocation();

  useEffect(() => {
    console.log("Exercise logs:", exerciseLogs); // Add this line
    if (location.state && location.state.exercises && location.state.today) {
      const { exercises, today } = location.state;
      setExerciseLogs((prevLogs) => ({
        ...prevLogs,
        [today]: exercises,
      }));
    }
  }, [location.state, exerciseLogs]);

  const currentDate = new Date();
  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);
  const monthDates = eachDayOfInterval({ start: startDate, end: endDate });

  const firstDayIndex = getDay(startDate);
  const emptyCells = [...Array(firstDayIndex)].map((_, index) => <div key={`empty-${index}`} className="calendar-date"></div>);

  const handleDateClick = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    console.log("Selected date:", formattedDate); // Add this line
    if (selectedDates.includes(formattedDate)) {
      setSelectedDates(selectedDates.filter((d) => d !== formattedDate));
    } else {
      setSelectedDates([...selectedDates, formattedDate]);
    }
  };

  const renderExerciseCards = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    if (exerciseLogs[formattedDate]) {
      return (
        <div key={formattedDate} className="exercise-card">
          <h3>{format(new Date(formattedDate), 'MMMM d, yyyy')}</h3>
          <ul>
            {exerciseLogs[formattedDate].map((exercise, index) => (
              <li key={index}>{exercise.name}</li>
            ))}
          </ul>
          {/* Add weight display here */}
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="activity">
      <Navbar /> {/* Include the Navbar component */}
      <header className="header">
      </header>
      <h2>Monthly Calendar</h2>
      <div className="month-name">{format(currentDate, 'MMMM yyyy')}</div>
      <div className="weekdays">
        <div className="weekday">Sun</div>
        <div className="weekday">Mon</div>
        <div className="weekday">Tue</div>
        <div className="weekday">Wed</div>
        <div className="weekday">Thu</div>
        <div className="weekday">Fri</div>
        <div className="weekday">Sat</div>
      </div>
      <div className="dates">
        {emptyCells}
        {monthDates.map((date) => (
          <div
            key={date.toISOString()}
            className={`calendar-date ${selectedDates.includes(date.toISOString().slice(0, 10)) ? 'selected' : ''} ${isToday(date) ? 'today' : ''}`}
            onClick={() => handleDateClick(date)}
          >
            {format(date, 'd')}
          </div>
        ))}
      </div>
      <div className="exercise-list">
        <h2>Exercise Log</h2>
        {selectedDates.map((date) => renderExerciseCards(new Date(date)))}
      </div>
    </div>
  );
}

export default Activity;

