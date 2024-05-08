# Import the Flask application and database instance from your main app module
from app import app, db  
from models import Exercise  # Ensure this imports your Exercise model correctly

# Define a function to seed exercises to the database
def seed_exercises():
    # List of exercises to seed
    exercises = [
        Exercise(name='Bench press', muscle_group='Chest', difficulty='Intermediate'),
        Exercise(name='Incline bench press', muscle_group='Chest', difficulty='Intermediate'),
        Exercise(name='Seated chest flys', muscle_group='Chest', difficulty='Intermediate'),
        Exercise(name='Overhead press', muscle_group='Shoulders', difficulty='Intermediate'),
        Exercise(name='Lateral raise', muscle_group='Shoulders', difficulty='Intermediate'),
        Exercise(name='Front delt raises', muscle_group='Shoulders', difficulty='Intermediate'),
        Exercise(name='Tricep push down', muscle_group='Triceps', difficulty='Intermediate'),
        Exercise(name='Dips', muscle_group='Triceps', difficulty='Intermediate'),
        Exercise(name='Skull crushes', muscle_group='Triceps', difficulty='Intermediate'),
        Exercise(name='Barbell row', muscle_group='Back', difficulty='Intermediate'),
        Exercise(name='Pull ups', muscle_group='Back', difficulty='Intermediate'),
        Exercise(name='Lat pulldown', muscle_group='Back', difficulty='Intermediate'),
        Exercise(name='Dumbbell curl', muscle_group='Biceps', difficulty='Intermediate'),
        Exercise(name='Preacher curl', muscle_group='Biceps', difficulty='Intermediate'),
        Exercise(name='Hammer curl', muscle_group='Biceps', difficulty='Intermediate'),
        Exercise(name='Squat', muscle_group='Legs', difficulty='Intermediate'),
        Exercise(name='Quad extension', muscle_group='Legs', difficulty='Intermediate'),
        Exercise(name='Hamstring Curl', muscle_group='Legs', difficulty='Intermediate'),
        Exercise(name='Running', muscle_group='Cardio', difficulty='Intermediate'),
        Exercise(name='Stairmaster', muscle_group='Cardio', difficulty='Intermediate'),
        Exercise(name='Rowing', muscle_group='Cardio', difficulty='Intermediate'),
    ]

    db.session.add_all(exercises)
    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        seed_exercises()