// import React from 'react';
// import './Exercise.css'; // Import your CSS file

// function ExerciseCard({ exercise, selected, onClick, onDelete }) {
//   const handleClick = () => {
//     onClick(exercise);
//   };

//   return (
//     <div className={`exercise-card ${selected ? 'selected' : ''}`} onClick={handleClick}>
//       {exercise.name}
//       <button onClick={(e) => {
//         e.stopPropagation(); // Prevent onClick from firing when the delete button is clicked
//         onDelete();
//       }}>Delete</button>
//     </div>
//   );
// }

// export default ExerciseCard;



import React from 'react';
import './Exercise.css';

function ExerciseCard({ exercise, selected, onClick, onDelete }) {
  return (
    <div className={`exercise-card ${selected ? 'selected' : ''}`} onClick={() => onClick(exercise)}>
      <img src={exercise.img} alt={exercise.name} className="exercise-image" />
      <h3>{exercise.name}</h3>
      <button onClick={(e) => { e.stopPropagation(); onDelete(); }}>Delete</button>
    </div>
  );
}

export default ExerciseCard;

