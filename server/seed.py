from app import app
import random
from datetime import datetime, timedelta
from random import choice, randint
from models import db, User, WeightLog, Exercise, UserExerciseLog

def create_users():
    users = [
        User(
            username='Kevin',
            email='kevin@gmail.com',
            password='abc123',
            height=178.0,  
            current_weight=75.0,  
            goal_weight=70.0
        ),
        User(
            username='Fab',
            email='fab@gmail.com',
            password='abc123',
            height=165.0, 
            current_weight=65.0,  
            goal_weight=60.0
        )
    ]

    db.session.add_all(users)
    db.session.commit()
    return users

def log_weights(users):
    today = datetime.now().date()
    for user in users:
        for i in range(30):  # Log weights for the past 30 days
            weight_log = WeightLog(
                date=today - timedelta(days=i),
                weight=user.current_weight - 0.1 * i,  # Simulated weight change
                user_id=user.id
            )
            db.session.add(weight_log)
    db.session.commit()

def create_exercises():
    exercises = [
        Exercise(name='Bench Press', muscle_group='Chest'),
        Exercise(name='Incline Bench Press', muscle_group='Chest'),
        Exercise(name='Seated Chest Flys', muscle_group='Chest'),
        Exercise(name='Overhead Press', muscle_group='Shoulders'),
        Exercise(name='Lateral Raise', muscle_group='Shoulders'),
        Exercise(name='Front Delt Raises', muscle_group='Shoulders'),
        Exercise(name='Tricep Push Down', muscle_group='Triceps'),
        Exercise(name='Dips', muscle_group='Triceps'),
        Exercise(name='Skull Crushers', muscle_group='Triceps'),
        Exercise(name='Barbell Row', muscle_group='Back'),
        Exercise(name='Pulls Ups', muscle_group='Back'),
        Exercise(name='Lat Pulldown', muscle_group='Back'),
        Exercise(name='Dumbbell Curl', muscle_group='Biceps'),
        Exercise(name='Preacher Curl', muscle_group='Biceps'),
        Exercise(name='Hammer Curl', muscle_group='Biceps'),
        Exercise(name='Squat', muscle_group='Legs'),
        Exercise(name='Quad Extension', muscle_group='Legs'),
        Exercise(name='Hamstring Curl', muscle_group='Legs'),
        Exercise(name='Running', muscle_group='Cardio'),
        Exercise(name='Stairmaster', muscle_group='Cardio'),
        Exercise(name='Rowing', muscle_group='Cardio')
    ]

    db.session.add_all(exercises)
    db.session.commit()
    return exercises

def log_exercises(users, exercises):
    today = datetime.now().date()
    for user in users:
        for i in range(30):  # Log exercises for the past 30 days
            log_date = today - timedelta(days=i)
            num_exercises = randint(1, 5)  # Random number of exercises per day (1-5)
            for _ in range(num_exercises):
                exercise = choice(exercises)
                exercise_log = UserExerciseLog(
                    date=log_date,
                    exercise_id=exercise.id,
                    user_id=user.id
                )
                db.session.add(exercise_log)
    db.session.commit()

def run():
    users = create_users()
    log_weights(users)
    exercises = create_exercises()
    log_exercises(users, exercises)

if __name__ == '__main__':
    with app.app_context():
        run()







# from app import app
# import random
# from datetime import datetime, timedelta
# from random import choice, random
# from flask import Flask
# from models import db, User, WeightLog, Exercise, UserExerciseLog


 
# def create_users():
#     users = [
#         User(
#             username='Kevin',
#             email='kevin@gmail.com',
#             password='abc123',
#             height=178.0,  
#             current_weight=75.0,  
#             goal_weight=70.0
    
#         ),
#         User(
#             username='Fab',
#             email='fab@gmail.com',
#             password='abc123',
#             height=165.0, 
#             current_weight=65.0,  
#             goal_weight=60.0
           
#         )
#     ]


#     db.session.add_all(users)
#     db.session.commit()
#     return users


# def log_weights(users):
#     today = datetime.now().date()
#     for user in users:
#         for i in range(30):  # Log weights for the past 30 days
#             weight_log = WeightLog(
#                 date=today - timedelta(days=i),
#                 weight=user.current_weight - 0.1 * i,  # Simulated weight change
#                 user_id=user.id
#             )
#             db.session.add(weight_log)
#     db.session.commit()


# def create_exercises():
#     """Seed the database with exercises."""
#     exercises = [
#         Exercise(name='Bench Press', muscle_group='Chest'),
#         Exercise(name='Incline Bench Press', muscle_group='Chest'),
#         Exercise(name='Seated Chest Flys', muscle_group='Chest'),
#         Exercise(name='Overhead Press', muscle_group='Shoulders'),
#         Exercise(name='Lateral Raise', muscle_group='Shoulders'),
#         Exercise(name='Front Delt Raises', muscle_group='Shoulders'),
#         Exercise(name='Tricep Push Down', muscle_group='Triceps'),
#         Exercise(name='Dips', muscle_group='Triceps'),
#         Exercise(name='Skull Crushers', muscle_group='Triceps'),
#         Exercise(name='Barbell Row', muscle_group='Back'),
#         Exercise(name='Pulls Ups', muscle_group='Back'),
#         Exercise(name='Lat Pulldown', muscle_group='Back'),
#         Exercise(name='Dumbbell Curl', muscle_group='Biceps'),
#         Exercise(name='Preacher Curl', muscle_group='Biceps'),
#         Exercise(name='Hammer Curl', muscle_group='Biceps'),
#         Exercise(name='Squat', muscle_group='Legs'),
#         Exercise(name='Quad Extension', muscle_group='Legs'),
#         Exercise(name='Hamstring Curl', muscle_group='Legs'),
#         Exercise(name='Running', muscle_group='Cardio'),
#         Exercise(name='Stairmaster', muscle_group='Cardio'),
#         Exercise(name='Rowing', muscle_group='Cardio')
#     ]

#     db.session.add_all(exercises)
#     db.session.commit()
#     return exercises


# def log_exercises(users, exercises):
#     today = datetime.now().date()
#     for user in users:
#         for i in range(30):  # Log exercises for the past 30 days
#             log_date = today - timedelta(days=i)
#             num_exercises = randint(1, 5)  # Random number of exercises per day (1-5)
#             for _ in range(num_exercises):
#                 exercise = choice(exercises)
#                 exercise_log = UserExerciseLog(
#                     date=log_date,
#                     exercise_id=exercise.id,
#                     user_id=user.id
#                 )
#                 db.session.add(exercise_log)
#     db.session.commit()




# if __name__ == '__main__':
#     with app.app_context():
#         run()


# def seed_all():
#     """Run all seeding functions."""
#     db.drop_all()
#     db.create_all()  # Make sure all tables are created as per your models
#     users = create_users()
#     log_weights(users)
#     exercises = create_exercises()
#     log_exercises(users, exercises)