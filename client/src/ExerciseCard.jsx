



// import React from 'react';
// import './Exercise.css';

// function ExerciseCard({ exercise, selected, onClick, onDelete }) {
//   return (
//     <div className={`exercise-card ${selected ? 'selected' : ''}`} onClick={() => onClick(exercise)}>
//       <img src={exercise.img} alt={exercise.name} className="exercise-image" />
//       <h3>{exercise.name}</h3>
//       <button onClick={(e) => { e.stopPropagation(); onDelete(); }}>Delete</button>
//     </div>
//   );
// }

// export default ExerciseCard;







// import React from 'react';
// import './Exercise.css';

// function ExerciseCard({ exercise, selected, onClick, onDelete }) {
//   return (
//     <div className={`exercise-card ${selected ? 'selected' : ''}`} onClick={onClick}>
//       <img src={exercise.img} alt={exercise.name} className="exercise-image" />
//       <div className="exercise-info">
//         <h3>{exercise.name}</h3>
//         <button onClick={(e) => { e.stopPropagation(); onDelete(); }}>Delete</button>
//       </div>
//     </div>
//   );
// }

// export default ExerciseCard;


import React from 'react';
import './Exercise.css';

function ExerciseCard({ exercise, selected, onClick, onDelete }) {
  return (
    <div className={`exercise-card ${selected ? 'selected' : ''}`} onClick={onClick}>
      <img src={exercise.img} alt={exercise.name} className="exercise-img" />
      <div className="exercise-info">
        <h3>{exercise.name}</h3>
        <button onClick={(e) => { e.stopPropagation(); onDelete(); }}>Delete</button>
      </div>
    </div>
  );
}

export default ExerciseCard;


