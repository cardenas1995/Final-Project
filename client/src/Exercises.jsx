// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Exercise.css';
// import ExerciseCard from './ExerciseCard';
// import Navbar from './Navbar';

// function Exercise() {
//   const [selectedExercises, setSelectedExercises] = useState([]);
//   const [exercisesData, setExercisesData] = useState({
//     Chest: [
//       { name: 'Bench Press' },
//       { name: 'Incline Bench Press' },
//       { name: 'Seated Chest Flys' }
//     ],
//     Shoulders: [
//       { name: 'Overhead Press' },
//       { name: 'Lateral Raise' },
//       { name: 'Front Delt Raises' }
//     ],
//     Triceps: [
//       { name: 'Tricep Push Down' },
//       { name: 'Dips' },
//       { name: 'Skull Crushers' }
//     ],
//     Back: [
//       { name: 'Barbell Row' },
//       { name: 'Pulls Ups' },
//       { name: 'Lat Pulldown' }
//     ],
//     Biceps: [
//       { name: 'Dumbbell Curl' },
//       { name: 'Preacher Curl' },
//       { name: 'Hammer Curl' }
//     ],
//     Legs: [
//       { name: 'Squat' },
//       { name: 'Quad Extension' },
//       { name: 'Hamstring Curl' }
//     ],
//     Cardio: [
//       { name: 'Running' },
//       { name: 'Stairmaster' },
//       { name: 'Rowing' }
//     ]
//   });
//   const [newExerciseName, setNewExerciseName] = useState({});
//   const navigate = useNavigate();

//   const handleExerciseClick = exercise => {
//     setSelectedExercises(prevSelected => {
//       const index = prevSelected.findIndex(selected => selected.name === exercise.name);
//       return index !== -1
//         ? prevSelected.filter(selected => selected.name !== exercise.name)
//         : [...prevSelected, exercise];
//     });
//   };

//   const handleAddExercise = muscleGroup => {
//     if (!newExerciseName[muscleGroup]) return; // Do nothing if no name is entered
//     setExercisesData(prevData => ({
//       ...prevData,
//       [muscleGroup]: [...prevData[muscleGroup], { name: newExerciseName[muscleGroup] }]
//     }));
//     setNewExerciseName(prevNames => ({ ...prevNames, [muscleGroup]: '' })); // Reset the input field
//   };

//   const handleDeleteExercise = (muscleGroup, exerciseName) => {
//     setExercisesData(prevData => ({
//       ...prevData,
//       [muscleGroup]: prevData[muscleGroup].filter(exercise => exercise.name !== exerciseName)
//     }));
//   };

//   return (
//     <div className="exercise">
//       <Navbar />
//       <header className="header">
//         <h1 className="exercise-title">Exercise List</h1>
//         <button onClick={() => navigate('/activity', { state: { exercises: selectedExercises } })}>
//           Selected ({selectedExercises.length})
//         </button>
//       </header>
//       <div className="exercise-list">
//         {Object.keys(exercisesData).map(group => (
//           <div key={group} className="muscle-group">
//             <h2 className="muscle-group-title">{group}</h2>
//             {exercisesData[group].map(exercise => (
//               <ExerciseCard
//                 key={exercise.name}
//                 exercise={exercise}
//                 selected={selectedExercises.some(selected => selected.name === exercise.name)}
//                 onClick={handleExerciseClick}
//                 onDelete={() => handleDeleteExercise(group, exercise.name)}
//               />
//             ))}
//             <div>
//               <input
//                 type="text"
//                 placeholder="Add New Exercise"
//                 value={newExerciseName[group] || ''}
//                 onChange={e => setNewExerciseName({...newExerciseName, [group]: e.target.value})}
//               />
//               <button onClick={() => handleAddExercise(group)}>Submit</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Exercise;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Exercise.css';
// import ExerciseCard from './ExerciseCard';
// import Navbar from './Navbar';

// function Exercise() {
//   const [selectedExercises, setSelectedExercises] = useState([]);
//   const [exercisesData, setExercisesData] = useState({});
//   const [newExerciseName, setNewExerciseName] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch exercises from the API
//     const fetchExercises = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:5555/exercises', {
//           credentials: 'include', // Include credentials for authentication
//         });
//         if (response.ok) {
//           const data = await response.json();
//           // Transform the fetched data into the required format
//           const transformedData = data.reduce((acc, exercise) => {
//             const { muscle_group, exercise_name } = exercise;
//             if (!acc[muscle_group]) {
//               acc[muscle_group] = [];
//             }
//             acc[muscle_group].push({ name: exercise_name });
//             return acc;
//           }, {});
//           setExercisesData(transformedData);
//         } else {
//           console.error('Failed to fetch exercises');
//         }
//       } catch (error) {
//         console.error('Error fetching exercises:', error);
//       }
//     };

//     fetchExercises();
//   }, []);

//   const handleExerciseClick = exercise => {
//     setSelectedExercises(prevSelected => {
//       const index = prevSelected.findIndex(selected => selected.name === exercise.name);
//       return index !== -1
//         ? prevSelected.filter(selected => selected.name !== exercise.name)
//         : [...prevSelected, exercise];
//     });
//   };

//   const handleAddExercise = muscleGroup => {
//     if (!newExerciseName[muscleGroup]) return; // Do nothing if no name is entered
//     setExercisesData(prevData => ({
//       ...prevData,
//       [muscleGroup]: [...prevData[muscleGroup], { name: newExerciseName[muscleGroup] }]
//     }));
//     setNewExerciseName(prevNames => ({ ...prevNames, [muscleGroup]: '' })); // Reset the input field
//   };

//   const handleDeleteExercise = (muscleGroup, exerciseName) => {
//     setExercisesData(prevData => ({
//       ...prevData,
//       [muscleGroup]: prevData[muscleGroup].filter(exercise => exercise.name !== exerciseName)
//     }));
//   };

//   return (
//     <div className="exercise">
//       <Navbar />
//       <header className="header">
//         <h1 className="exercise-title">Exercise List</h1>
//         <button onClick={() => navigate('/activity', { state: { exercises: selectedExercises } })}>
//           Selected ({selectedExercises.length})
//         </button>
//       </header>
//       <div className="exercise-list">
//         {Object.keys(exercisesData).map(group => (
//           <div key={group} className="muscle-group">
//             <h2 className="muscle-group-title">{group}</h2>
//             {exercisesData[group].map(exercise => (
//               <ExerciseCard
//                 key={exercise.name}
//                 exercise={exercise}
//                 selected={selectedExercises.some(selected => selected.name === exercise.name)}
//                 onClick={handleExerciseClick}
//                 onDelete={() => handleDeleteExercise(group, exercise.name)}
//               />
//             ))}
//             <div>
//               <input
//                 type="text"
//                 placeholder="Add New Exercise"
//                 value={newExerciseName[group] || ''}
//                 onChange={e => setNewExerciseName({ ...newExerciseName, [group]: e.target.value })}
//               />
//               <button onClick={() => handleAddExercise(group)}>Submit</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Exercise;






// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Exercise.css';
// import ExerciseCard from './ExerciseCard';
// import Navbar from './Navbar';

// function Exercises() {
//   const [selectedExercises, setSelectedExercises] = useState([]);
//   const [exercisesData, setExercisesData] = useState({});
//   const [newExerciseName, setNewExerciseName] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchExercises = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:5555/exercises', {
//           credentials: 'include',
//         });
//         if (response.ok) {
//           const data = await response.json();
//           const transformedData = data.reduce((acc, exercise) => {
//             const { muscle_group, exercise_name, img } = exercise;
//             if (!acc[muscle_group]) {
//               acc[muscle_group] = [];
//             }
//             const isDuplicate = acc[muscle_group].some(item => item.name === exercise_name);
//             if (!isDuplicate) {
//               acc[muscle_group].push({ name: exercise_name, img });
//             }
//             return acc;
//           }, {});
//           setExercisesData(transformedData);
//         } else {
//           console.error('Failed to fetch exercises');
//         }
//       } catch (error) {
//         console.error('Error fetching exercises:', error);
//       }
//     };

//     fetchExercises();
//   }, []);

//   const handleExerciseClick = exercise => {
//     setSelectedExercises(prevSelected => {
//       const index = prevSelected.findIndex(selected => selected.name === exercise.name);
//       return index !== -1
//         ? prevSelected.filter(selected => selected.name !== exercise.name)
//         : [...prevSelected, exercise];
//     });
//   };

//   const handleAddExercise = muscleGroup => {
//     if (!newExerciseName[muscleGroup]) return;
//     setExercisesData(prevData => ({
//       ...prevData,
//       [muscleGroup]: [...prevData[muscleGroup], { name: newExerciseName[muscleGroup] }]
//     }));
//     setNewExerciseName(prevNames => ({ ...prevNames, [muscleGroup]: '' }));
//   };

//   const handleDeleteExercise = (muscleGroup, exerciseName) => {
//     setExercisesData(prevData => ({
//       ...prevData,
//       [muscleGroup]: prevData[muscleGroup].filter(exercise => exercise.name !== exerciseName)
//     }));
//   };

//   const handleLogExercises = () => {
//     const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
//     navigate('/activity', { state: { exercises: selectedExercises, today } });
//   };

//   return (
//     <div className="exercise">
//       <Navbar />
//       <header className="header">
//         <h1 className="exercise-title">Exercise List</h1>
//         <button onClick={handleLogExercises}>
//           Selected ({selectedExercises.length})
//         </button>
//       </header>
//       <div className="exercise-list">
//         {Object.keys(exercisesData).map(group => (
//           <div key={group} className="muscle-group">
//             <h2 className="muscle-group-title">{group}</h2>
//             {exercisesData[group].map(exercise => (
//               <ExerciseCard
//                 key={exercise.name}
//                 exercise={exercise}
//                 selected={selectedExercises.some(selected => selected.name === exercise.name)}
//                 onClick={handleExerciseClick}
//                 onDelete={() => handleDeleteExercise(group, exercise.name)}
//               />
//             ))}
//             <div>
//               <input
//                 type="text"
//                 placeholder="Add New Exercise"
//                 value={newExerciseName[group] || ''}
//                 onChange={e => setNewExerciseName({ ...newExerciseName, [group]: e.target.value })}
//               />
//               <button onClick={() => handleAddExercise(group)}>Submit</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Exercises;





import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Exercise.css';
import ExerciseCard from './ExerciseCard';
import Navbar from './Navbar';

function Exercise() {
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [exercisesData, setExercisesData] = useState({});
  const [newExerciseName, setNewExerciseName] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5555/exercises', {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          const transformedData = data.reduce((acc, exercise) => {
            const { muscle_group, exercise_name, img } = exercise;
            if (!acc[muscle_group]) {
              acc[muscle_group] = [];
            }
            const isDuplicate = acc[muscle_group].some(item => item.name === exercise_name);
            if (!isDuplicate) {
              acc[muscle_group].push({ name: exercise_name, img });
            }
            return acc;
          }, {});
          setExercisesData(transformedData);
        } else {
          console.error('Failed to fetch exercises');
        }
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchExercises();
  }, []);

  const handleExerciseClick = exercise => {
    setSelectedExercises(prevSelected => {
      const index = prevSelected.findIndex(selected => selected.name === exercise.name);
      return index !== -1
        ? prevSelected.filter(selected => selected.name !== exercise.name)
        : [...prevSelected, exercise];
    });
  };

  const handleAddExercise = muscleGroup => {
    if (!newExerciseName[muscleGroup]) return;
    setExercisesData(prevData => ({
      ...prevData,
      [muscleGroup]: [...prevData[muscleGroup], { name: newExerciseName[muscleGroup] }]
    }));
    setNewExerciseName(prevNames => ({ ...prevNames, [muscleGroup]: '' }));
  };

  const handleDeleteExercise = (muscleGroup, exerciseName) => {
    setExercisesData(prevData => ({
      ...prevData,
      [muscleGroup]: prevData[muscleGroup].filter(exercise => exercise.name !== exerciseName)
    }));
  };

  const handleNavigateToActivity = () => {
    const today = new Date().toISOString().split('T')[0];
    navigate('/activity', { state: { exercises: selectedExercises, today } });
  };

  return (
    <div className="exercise">
      <Navbar />
      <header className="header">
        <h1 className="exercise-title">Exercise List</h1>
        <button onClick={handleNavigateToActivity}>
          Selected ({selectedExercises.length})
        </button>
      </header>
      <div className="exercise-list">
        {Object.keys(exercisesData).map(group => (
          <div key={group} className="muscle-group">
            <h2 className="muscle-group-title">{group}</h2>
            {exercisesData[group].map(exercise => (
              <ExerciseCard
                key={exercise.name}
                exercise={exercise}
                selected={selectedExercises.some(selected => selected.name === exercise.name)}
                onClick={handleExerciseClick}
                onDelete={() => handleDeleteExercise(group, exercise.name)}
              />
            ))}
            <div>
              <input
                type="text"
                placeholder="Add New Exercise"
                value={newExerciseName[group] || ''}
                onChange={e => setNewExerciseName({ ...newExerciseName, [group]: e.target.value })}
              />
              <button onClick={() => handleAddExercise(group)}>Submit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Exercise;


