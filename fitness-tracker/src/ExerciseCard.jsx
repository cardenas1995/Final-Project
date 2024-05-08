import React from 'react';
import './Exercise.css'; // Import your CSS file

function ExerciseCard({ exercise, selected, onClick, onDelete }) {
  const handleClick = () => {
    onClick(exercise);
  };

  return (
    <div className={`exercise-card ${selected ? 'selected' : ''}`} onClick={handleClick}>
      {exercise.name}
      <button onClick={(e) => {
        e.stopPropagation(); // Prevent onClick from firing when the delete button is clicked
        onDelete();
      }}>Delete</button>
    </div>
  );
}

export default ExerciseCard;
