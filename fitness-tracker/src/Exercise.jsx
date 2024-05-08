import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Exercise.css';
import ExerciseCard from './ExerciseCard';
import Navbar from './Navbar';

function Exercise() {
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [exercisesData, setExercisesData] = useState({
    Chest: [
      { name: 'Bench Press' },
      { name: 'Incline Bench Press' },
      { name: 'Seated Chest Flys' }
    ],
    Shoulders: [
      { name: 'Overhead Press' },
      { name: 'Lateral Raise' },
      { name: 'Front Delt Raises' }
    ],
    Triceps: [
      { name: 'Tricep Push Down' },
      { name: 'Dips' },
      { name: 'Skull Crushers' }
    ],
    Back: [
      { name: 'Barbell Row' },
      { name: 'Pulls Ups' },
      { name: 'Lat Pulldown' }
    ],
    Biceps: [
      { name: 'Dumbbell Curl' },
      { name: 'Preacher Curl' },
      { name: 'Hammer Curl' }
    ],
    Legs: [
      { name: 'Squat' },
      { name: 'Quad Extension' },
      { name: 'Hamstring Curl' }
    ],
    Cardio: [
      { name: 'Running' },
      { name: 'Stairmaster' },
      { name: 'Rowing' }
    ]
  });
  const [newExerciseName, setNewExerciseName] = useState({});
  const navigate = useNavigate();

  const handleExerciseClick = exercise => {
    setSelectedExercises(prevSelected => {
      const index = prevSelected.findIndex(selected => selected.name === exercise.name);
      return index !== -1
        ? prevSelected.filter(selected => selected.name !== exercise.name)
        : [...prevSelected, exercise];
    });
  };

  const handleAddExercise = muscleGroup => {
    if (!newExerciseName[muscleGroup]) return; // Do nothing if no name is entered
    setExercisesData(prevData => ({
      ...prevData,
      [muscleGroup]: [...prevData[muscleGroup], { name: newExerciseName[muscleGroup] }]
    }));
    setNewExerciseName(prevNames => ({ ...prevNames, [muscleGroup]: '' })); // Reset the input field
  };

  const handleDeleteExercise = (muscleGroup, exerciseName) => {
    setExercisesData(prevData => ({
      ...prevData,
      [muscleGroup]: prevData[muscleGroup].filter(exercise => exercise.name !== exerciseName)
    }));
  };

  return (
    <div className="exercise">
      <Navbar />
      <header className="header">
        <h1 className="exercise-title">Exercise List</h1>
        <button onClick={() => navigate('/activity', { state: { exercises: selectedExercises } })}>
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
                onChange={e => setNewExerciseName({...newExerciseName, [group]: e.target.value})}
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
