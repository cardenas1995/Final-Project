

// import React, { useState, useEffect } from 'react';
// import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isToday } from 'date-fns';
// import { useLocation } from 'react-router-dom';
// import Navbar from './Navbar';
// import './Activity.css';

// function Activity() {
//   const [selectedDates, setSelectedDates] = useState([]);
//   const [exerciseLogs, setExerciseLogs] = useState({});
//   const [highlightedDates, setHighlightedDates] = useState([]);
//   const location = useLocation();

//   useEffect(() => {
//     // Fetch exercise logs for the entire month on component mount
//     const fetchExerciseLogs = async () => {
//       try {
//         const currentDate = new Date();
//         const month = currentDate.getMonth() + 1;
//         const year = currentDate.getFullYear();
//         const response = await fetch(`http://127.0.0.1:5555/activity?month=${month}&year=${year}`, {
//           credentials: 'include',
//         });
//         if (response.ok) {
//           const data = await response.json();
//           const logs = {};
//           const dates = [];
//           data.forEach(log => {
//             const date = log.date;
//             if (!logs[date]) {
//               logs[date] = [];
//               dates.push(date);
//             }
//             logs[date].push(log);
//           });
//           setExerciseLogs(logs);
//           setHighlightedDates(dates);
//         } else {
//           console.error('Failed to fetch exercise logs');
//         }
//       } catch (error) {
//         console.error('Error fetching exercise logs:', error);
//       }
//     };

//     fetchExerciseLogs();
//   }, []);

//   useEffect(() => {
//     if (location.state && location.state.exercises && location.state.today) {
//       const { exercises, today } = location.state;
//       console.log('Adding exercises to logs:', { [today]: exercises });
//       setExerciseLogs((prevLogs) => ({
//         ...prevLogs,
//         [today]: exercises,
//       }));
//       if (!highlightedDates.includes(today)) {
//         setHighlightedDates([...highlightedDates, today]);
//       }
//     }
//   }, [location.state, highlightedDates]);

//   const currentDate = new Date();
//   const startDate = startOfMonth(currentDate);
//   const endDate = endOfMonth(currentDate);
//   const monthDates = eachDayOfInterval({ start: startDate, end: endDate });

//   const firstDayIndex = getDay(startDate);
//   const emptyCells = [...Array(firstDayIndex)].map((_, index) => <div key={`empty-${index}`} className="calendar-date"></div>);

//   const handleDateClick = (date) => {
//     const formattedDate = format(date, 'yyyy-MM-dd');
//     console.log('Selected date:', formattedDate);
//     if (selectedDates.includes(formattedDate)) {
//       setSelectedDates(selectedDates.filter((d) => d !== formattedDate));
//     } else {
//       setSelectedDates([...selectedDates, formattedDate]);
//     }
//   };

//   const renderExerciseCards = (formattedDate) => {
//     console.log('Rendering exercises for date:', formattedDate);
//     console.log('Exercise logs:', exerciseLogs);
//     if (exerciseLogs[formattedDate]) {
//       return (
//         <div key={formattedDate} className="exercise-card">
//           <ul>
//             {exerciseLogs[formattedDate].map((exercise, index) => (
//               <li key={index}>
//                 <img src={exercise.img} alt={exercise.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
//                 {exercise.name}
//               </li>
//             ))}
//           </ul>
//         </div>
//       );
//     } else {
//       return (
//         <div key={formattedDate} className="exercise-card no-exercises">
//           <p>No exercises logged for this date.</p>
//         </div>
//       );
//     }
//   };

//   return (
//     <div className="activity">
//       <Navbar />
//       <header className="header"></header>
//       <h2>Monthly Calendar</h2>
//       <div className="month-name">{format(currentDate, 'MMMM yyyy')}</div>
//       <div className="weekdays">
//         <div className="weekday">Sun</div>
//         <div className="weekday">Mon</div>
//         <div className="weekday">Tue</div>
//         <div className="weekday">Wed</div>
//         <div className="weekday">Thu</div>
//         <div className="weekday">Fri</div>
//         <div className="weekday">Sat</div>
//       </div>
//       <div className="dates">
//         {emptyCells}
//         {monthDates.map((date) => {
//           const formattedDate = format(date, 'yyyy-MM-dd');
//           return (
//             <div
//               key={date.toISOString()}
//               className={`calendar-date ${highlightedDates.includes(formattedDate) ? 'highlighted' : ''} ${selectedDates.includes(formattedDate) ? 'selected' : ''} ${isToday(date) ? 'today' : ''}`}
//               onClick={() => handleDateClick(date)}
//             >
//               {format(date, 'd')}
//             </div>
//           );
//         })}
//       </div>
//       <div className="exercise-list">
//         <h2>Exercise Log</h2>
//         {selectedDates.map((formattedDate) => renderExerciseCards(formattedDate))}
//       </div>
//     </div>
//   );
// }

// export default Activity;






import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isToday } from 'date-fns';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import './Activity.css';

function Activity() {
  const [selectedDates, setSelectedDates] = useState([]);
  const [exerciseLogs, setExerciseLogs] = useState({});
  const [highlightedDates, setHighlightedDates] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchExerciseLogs = async () => {
      try {
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();

        const response = await fetch(`http://127.0.0.1:5555/api/activity?month=${month}&year=${year}`, {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          const logs = {};
          const dates = [];
          data.forEach(log => {
            const date = log.date;
            if (!logs[date]) {
              logs[date] = [];
              dates.push(date);
            }
            logs[date].push(log);
          });
          setExerciseLogs(logs);
          setHighlightedDates(dates);
        } else {
          console.error('Failed to fetch exercise logs');
        }
      } catch (error) {
        console.error('Error fetching exercise logs:', error);
      }
    };

    fetchExerciseLogs();
  }, []);

  useEffect(() => {
    if (location.state && location.state.exercises && location.state.today) {
      const { exercises, today } = location.state;
      console.log('Adding exercises to logs:', { [today]: exercises });
      setExerciseLogs((prevLogs) => ({
        ...prevLogs,
        [today]: exercises,
      }));
      if (!highlightedDates.includes(today)) {
        setHighlightedDates([...highlightedDates, today]);
      }
    }
  }, [location.state, highlightedDates]);

  const currentDate = new Date();
  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);
  const monthDates = eachDayOfInterval({ start: startDate, end: endDate });

  const firstDayIndex = getDay(startDate);
  const emptyCells = [...Array(firstDayIndex)].map((_, index) => <div key={`empty-${index}`} className="calendar-date"></div>);

  const handleDateClick = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    console.log('Selected date:', formattedDate);
    if (selectedDates.includes(formattedDate)) {
      setSelectedDates(selectedDates.filter((d) => d !== formattedDate));
    } else {
      setSelectedDates([...selectedDates, formattedDate]);
    }
  };

  const renderExerciseCards = (formattedDate) => {
    console.log('Rendering exercises for date:', formattedDate);
    console.log('Exercise logs:', exerciseLogs);
    if (exerciseLogs[formattedDate]) {
      return (
        <div key={formattedDate} className="exercise-card">
          <ul>
            {exerciseLogs[formattedDate].map((exercise, index) => (
              <li key={index}>
                <img src={exercise.img} alt={exercise.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                {exercise.name}
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return (
        <div key={formattedDate} className="exercise-card no-exercises">
          <p>No exercises logged for this date.</p>
        </div>
      );
    }
  };

  return (
    <div className="activity">
      <Navbar />
      <header className="header"></header>
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
        {monthDates.map((date) => {
          const formattedDate = format(date, 'yyyy-MM-dd');
          return (
            <div
              key={date.toISOString()}
              className={`calendar-date ${highlightedDates.includes(formattedDate) ? 'highlighted' : ''} ${selectedDates.includes(formattedDate) ? 'selected' : ''} ${isToday(date) ? 'today' : ''}`}
              onClick={() => handleDateClick(date)}
            >
              {format(date, 'd')}
            </div>
          );
        })}
      </div>
      <div className="exercise-list">
        <h2>Exercise Log</h2>
        {selectedDates.map((formattedDate) => renderExerciseCards(formattedDate))}
      </div>
    </div>
  );
}

export default Activity;





