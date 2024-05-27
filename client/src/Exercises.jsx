
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
            const { muscle_group, exercise_name, image_url } = exercise;
            if (!acc[muscle_group]) {
              acc[muscle_group] = [];
            }
            const isDuplicate = acc[muscle_group].some(item => item.name === exercise_name);
            if (!isDuplicate) {
              acc[muscle_group].push({ name: exercise_name, img: image_url });
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
        <button className="selected-button" onClick={handleNavigateToActivity}>
          Selected ({selectedExercises.length})
        </button>
      </header>
      <div className="exercise-list">
        {Object.keys(exercisesData).map(group => (
          <div key={group} className="muscle-group">
            <h2 className="muscle-group-title">{group}</h2>
            <div className="exercise-cards">
              {exercisesData[group].map(exercise => (
                <ExerciseCard
                  key={exercise.name}
                  exercise={exercise}
                  selected={selectedExercises.some(selected => selected.name === exercise.name)}
                  onClick={() => handleExerciseClick(exercise)}
                  onDelete={() => handleDeleteExercise(group, exercise.name)}
                />
              ))}
            </div>
            <div className="add-exercise">
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
