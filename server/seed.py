


# from app import app
# from models import db, User, WeightLog, Exercise, ExerciseLog
# from datetime import datetime, timedelta
# from random import choice

# def clear_data():
#     try:
#         db.drop_all()
#         db.create_all()
#         print("Database cleared and re-created successfully.")
#     except Exception as e:
#         print(f"Error clearing the database: {e}")

# def create_users():
#     try:
#         users = [
#             User(name='Kevin', email='kevin@example.com', height=178.0, weight=75.0, goal_weight=70.0, password='abc123'),
#             User(name='Fab', email='fab@example.com', height=165.0, weight=65.0, goal_weight=60.0, password='abc123')
#         ]

#         db.session.add_all(users)
#         db.session.commit()
#         print("Users created successfully.")
#         return users
#     except Exception as e:
#         print(f"Error creating users: {e}")
#         db.session.rollback()

# def log_weights(users):
#     try:
#         today = datetime.now().date()
#         for user in users:
#             for i in range(0, 30, 3):  # Log weights every 3 days for the past 30 days
#                 weight_log = WeightLog(date=today - timedelta(days=i), weight=user.weight - 0.1 * (i // 3), user_id=user.id)
#                 db.session.add(weight_log)
#         db.session.commit()
#         print("Weights logged successfully.")
#     except Exception as e:
#         print(f"Error logging weights: {e}")
#         db.session.rollback()

# def create_exercises():
#     try:
#         exercises = [
#             Exercise(name='Squats', muscle_group='Legs', difficulty='Intermediate', push_pull='Legs', img="https://images.unsplash.com/photo-1596357395217-80de13130e92?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3F1YXR0aW5nfGVufDB8fDB8fHww"),
#             Exercise(name='Bench Press', muscle_group='Chest', difficulty='Advanced', push_pull='Push', img="https://plus.unsplash.com/premium_photo-1682094035772-a5ccdb07d9b0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmVuY2glMjBwcmVzc3xlbnwwfHwwfHx8MA%3D%3D"),
#             Exercise(name='Push-ups', muscle_group='Upper Body', difficulty='Beginner', push_pull='Push', img='https://images.contentstack.io/v3/assets/blt45c082eaf9747747/blt590cd1c4bd125af7/5fa2d53cc1502b76a1699490/Pushups.jpg?width=1200&height=630&fit=crop'),
#             Exercise(name='Pull-ups', muscle_group='Upper Body', difficulty='Intermediate', push_pull='Pull', img='https://bod-blog-assets.prod.cd.beachbodyondemand.com/bod-blog/wp-content/uploads/2015/08/bb_pull-ups-regular_web.jpg'),
#             Exercise(name='Deadlifts', muscle_group='Back', difficulty='Beginner', push_pull='Pull', img='https://blogscdn.thehut.net/wp-content/uploads/sites/478/2018/10/12113512/Blog-Deadlifting-Male_1800x1200.jpg'),
#             Exercise(name='Lunges', muscle_group='Legs', difficulty='Intermediate', push_pull='Legs', img='https://hips.hearstapps.com/hmg-prod/images/reverse-lunges-1544222100.jpg?crop=0.6235xw:1xh;center,top&resize=640:*'),
#             Exercise(name='Hammer Curls', muscle_group='Arms', difficulty='Intermediate', push_pull='Pull', img='https://www.trainheroic.com/wp-content/uploads/2023/02/AdobeStock_417412809-TH-jpg.webp'),
#             Exercise(name='Rows', muscle_group='Back', difficulty='Intermediate', push_pull='Pull', img='https://images.ctfassets.net/8urtyqugdt2l/5JyoMOTRMiqUgeX3xcFAot/adc9c772286fb52694a1d39de481709a/barbell-row-tile.jpg'),
#             Exercise(name='Curls', muscle_group='Arms', difficulty='Intermediate', push_pull='Pull', img='https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2017/11/1109-hammer-curl.jpg?quality=86&strip=all'),
#             Exercise(name='Leg Press', muscle_group='Legs', difficulty='Intermediate', push_pull='Legs', img='https://yorkbarbell.com/wp-content/uploads/2017/01/55035_leg-press_in-use_low.jpg'),
#             Exercise(name='Crunches', muscle_group='Core', difficulty='Beginner', push_pull='Core', img='https://images.contentstack.io/v3/assets/blt45c082eaf9747747/blta2cf34be231e50d5/5faa9e613cdbef7187ce5a83/FL_1_Blog-Header-Pics_1232-x-630_V3-crunches.jpg?format=pjpg&auto=webp&quality=76&width=1232'),
#             Exercise(name='Dumbbell Lunges', muscle_group='Legs', difficulty='Intermediate', push_pull='Legs', img='https://hips.hearstapps.com/hmg-prod/images/dumbbell-lunge-1675879057.jpg'),
#             Exercise(name='Dumbbell Rows', muscle_group='Back', difficulty='Intermediate', push_pull='Pull', img='https://www.dmoose.com/cdn/shop/articles/MicrosoftTeams-image_2_90411cba-7995-4fac-8f20-af7caa6406a0.jpg?v=1652281904'),
#             Exercise(name='Bodyweight Squats', muscle_group='Legs', difficulty='Beginner', push_pull='Legs', img='https://media1.popsugar-assets.com/files/thumbor/CJmnrrrF7n5F6Fs5ys2R3CBCcK0=/fit-in/792x549/top/filters:format_auto():upscale()/2018/07/17/791/n/43387813/93ecc1623d512e58_Basic-Squat.jpg'),
#             Exercise(name='Pistol Squats', muscle_group='Legs', difficulty='Advanced', push_pull='Legs', img='https://images.contentstack.io/v3/assets/blt45c082eaf9747747/blt6eea3a2cdab8e52a/5fa3ce8965bdd35303dff85f/FL_1_Blog-Header-Pics_1232-x-630_V2-pistol-squat.jpg?width=1200&height=630&fit=crop'),
#             Exercise(name='Box Jumps', muscle_group='Legs', difficulty='Advanced', push_pull='Legs', img='https://hips.hearstapps.com/hmg-prod/images/box-jump-1585302208.jpeg'),
#             Exercise(name='Lat Pulldowns', muscle_group='Back', difficulty='Intermediate', push_pull='Pull', img='https://steelsupplements.com/cdn/shop/articles/Lat_pulldowns_machine_-_cover_-_shutterstock_2137570149_1000x.jpg?v=1661886914'),
#             Exercise(name='Barbell Deadlifts', muscle_group='Back', difficulty='Advanced', push_pull='Pull', img='https://hips.hearstapps.com/hmg-prod/images/fai-6793-1644532875.jpeg'),
#             Exercise(name='Tricep Dips', muscle_group='Arms', difficulty='Intermediate', push_pull='Push', img='https://hips.hearstapps.com/hmg-prod/images/dips-1608221119.jpg?resize=980:*')
#         ]

#         db.session.add_all(exercises)
#         db.session.commit()
#         print("Exercises created successfully.")
#         return exercises
#     except Exception as e:
#         print(f"Error creating exercises: {e}")
#         db.session.rollback()

# def log_exercises(users, exercises):
#     try:
#         today = datetime.now().date()
#         for user in users:
#             for i in range(0, 30, 3):  # Log exercises for every 3rd day
#                 log_date = today - timedelta(days=i)
#                 for _ in range(3):  # Log exactly 3 exercises per day
#                     exercise = choice(exercises)
#                     exercise_log = ExerciseLog(
#                         date=log_date,
#                         exercise_name=exercise.name,
#                         muscle_group=exercise.muscle_group,
#                         image_url=exercise.img,
#                         user_id=user.id
#                     )
#                     db.session.add(exercise_log)
#         db.session.commit()
#         print("Exercises logged successfully.")
#     except Exception as e:
#         print(f"Error logging exercises: {e}")
#         db.session.rollback()


# def run():
#     clear_data()
#     users = create_users()
#     if users:
#         log_weights(users)
#         exercises = create_exercises()
#         if exercises:
#             log_exercises(users, exercises)

# if __name__ == '__main__':
#     with app.app_context():
#         run()





# from app import app
# from models import db, User, WeightLog, Exercise, ExerciseLog
# from datetime import datetime, timedelta
# from random import choice, uniform

# def clear_data():
#     try:
#         db.drop_all()
#         db.create_all()
#         print("Database cleared and re-created successfully.")
#     except Exception as e:
#         print(f"Error clearing the database: {e}")

# def create_users():
#     try:
#         users = [
#             User(name='Kevin', email='kevin@example.com', height=178.0, weight=175.0, goal_weight=160.0, password='abc123'),
#             User(name='Fab', email='fab@example.com', height=165.0, weight=160.0, goal_weight=145.0, password='abc123')
#         ]

#         db.session.add_all(users)
#         db.session.commit()
#         print("Users created successfully.")
#         return users
#     except Exception as e:
#         print(f"Error creating users: {e}")
#         db.session.rollback()

# def log_weights(users):
#     try:
#         today = datetime.now().date()
#         for user in users:
#             initial_weight = user.weight
#             weight = initial_weight
#             for i in range(0, 30, 3):  # Log weights every 3 days for the past 30 days
#                 days_passed = i
#                 if days_passed > 0:
#                     # Randomly change the weight
#                     change = uniform(-3.0, 3.0)  # Random change between -3.0 and 3.0 pounds
#                     weight += change

#                 # Ensure weight does not increase or decrease too rapidly
#                 if weight > initial_weight + 5:
#                     weight = initial_weight + 5
#                 elif weight < user.goal_weight:
#                     weight = user.goal_weight

#                 weight_log = WeightLog(
#                     date=today - timedelta(days=days_passed),
#                     weight=weight,
#                     user_id=user.id
#                 )
#                 db.session.add(weight_log)
#         db.session.commit()
#         print("Weights logged successfully.")
#     except Exception as e:
#         print(f"Error logging weights: {e}")
#         db.session.rollback()

# def create_exercises():
#     try:
#         exercises = [
#             Exercise(name='Squats', muscle_group='Legs'),
#             Exercise(name='Bench Press', muscle_group='Chest'),
#             Exercise(name='Push-ups', muscle_group='Upper Body'),
#             Exercise(name='Pull-ups', muscle_group='Upper Body'),
#             Exercise(name='Deadlifts', muscle_group='Back'),
#             Exercise(name='Lunges', muscle_group='Legs'),
#             Exercise(name='Hammer Curls', muscle_group='Arms'),
#             Exercise(name='Rows', muscle_group='Back'),
#             Exercise(name='Curls', muscle_group='Arms'),
#             Exercise(name='Leg Press', muscle_group='Legs'),
#             Exercise(name='Crunches', muscle_group='Core'),
#             Exercise(name='Dumbbell Lunges', muscle_group='Legs'),
#             Exercise(name='Dumbbell Rows', muscle_group='Back'),
#             Exercise(name='Bodyweight Squats', muscle_group='Legs'),
#             Exercise(name='Pistol Squats', muscle_group='Legs'),
#             Exercise(name='Box Jumps', muscle_group='Legs'),
#             Exercise(name='Lat Pulldowns', muscle_group='Back'),
#             Exercise(name='Barbell Deadlifts', muscle_group='Back'),
#             Exercise(name='Tricep Dips', muscle_group='Arms'),
#             Exercise(name='Burpees', muscle_group='Full Body'),
#             Exercise(name='Mountain Climbers', muscle_group='Core'),
#             Exercise(name='Russian Twists', muscle_group='Core'),
#             Exercise(name='Plank', muscle_group='Core'),
#             Exercise(name='Side Plank', muscle_group='Core'),
#             Exercise(name='Bicycle Crunches', muscle_group='Core'),
#             Exercise(name='Leg Raises', muscle_group='Core'),
#             Exercise(name='Flutter Kicks', muscle_group='Core'),
#             Exercise(name='Toe Touches', muscle_group='Core'),
#             Exercise(name='Jumping Jacks', muscle_group='Full Body'),
#             Exercise(name='High Knees', muscle_group='Full Body'),
#             Exercise(name='Butt Kicks', muscle_group='Legs'),
#             Exercise(name='Jump Rope', muscle_group='Full Body'),
#             Exercise(name='Tricep Extensions', muscle_group='Arms'),
#             Exercise(name='Bicep Curls', muscle_group='Arms'),
#             Exercise(name='Skull Crushers', muscle_group='Arms'),
#             Exercise(name='Arnold Press', muscle_group='Shoulders'),
#             Exercise(name='Lateral Raises', muscle_group='Shoulders'),
#             Exercise(name='Front Raises', muscle_group='Shoulders'),
#             Exercise(name='Reverse Flyes', muscle_group='Back'),
#             Exercise(name='Chest Flyes', muscle_group='Chest'),
#             Exercise(name='Incline Bench Press', muscle_group='Chest'),
#             Exercise(name='Decline Bench Press', muscle_group='Chest'),
#             Exercise(name='Chest Dips', muscle_group='Chest'),
#             Exercise(name='Overhead Press', muscle_group='Shoulders'),
#             Exercise(name='Military Press', muscle_group='Shoulders'),
#             Exercise(name='Push Press', muscle_group='Shoulders'),
#             Exercise(name='Bent Over Rows', muscle_group='Back'),
#             Exercise(name='Seated Rows', muscle_group='Back'),
#             Exercise(name='Single Arm Rows', muscle_group='Back'),
#             Exercise(name='Face Pulls', muscle_group='Back'),
#             Exercise(name='Pull Throughs', muscle_group='Back'),
#             Exercise(name='Hip Thrusts', muscle_group='Legs'),
#             Exercise(name='Step Ups', muscle_group='Legs'),
#             Exercise(name='Bulgarian Split Squats', muscle_group='Legs'),
#             Exercise(name='Calf Raises', muscle_group='Legs'),
#             Exercise(name='Glute Bridges', muscle_group='Legs'),
#             Exercise(name='Good Mornings', muscle_group='Back'),
#             Exercise(name='Landmine Press', muscle_group='Shoulders'),
#             Exercise(name='Zercher Squats', muscle_group='Legs'),
#             Exercise(name='Goblet Squats', muscle_group='Legs'),
#             Exercise(name='Sumo Squats', muscle_group='Legs'),
#             Exercise(name='Farmer Walks', muscle_group='Full Body'),
#             Exercise(name='Sled Push', muscle_group='Full Body'),
#             Exercise(name='Sled Pull', muscle_group='Full Body'),
#             Exercise(name='Tire Flips', muscle_group='Full Body'),
#             Exercise(name='Battle Ropes', muscle_group='Full Body'),
#             Exercise(name='Kettlebell Swings', muscle_group='Full Body'),
#             Exercise(name='Turkish Get Ups', muscle_group='Full Body'),
#             Exercise(name='Medicine Ball Slams', muscle_group='Full Body'),
#             Exercise(name='Medicine Ball Throws', muscle_group='Full Body'),
#             Exercise(name='Plyometric Push-ups', muscle_group='Upper Body'),
#             Exercise(name='Handstand Push-ups', muscle_group='Shoulders'),
#             Exercise(name='L-Sit', muscle_group='Core'),
#             Exercise(name='Hollow Body Hold', muscle_group='Core'),
#             Exercise(name='Superman', muscle_group='Back'),
#             Exercise(name='Bird Dog', muscle_group='Core'),
#             Exercise(name='Dead Bug', muscle_group='Core'),
#             Exercise(name='Windshield Wipers', muscle_group='Core'),
#             Exercise(name='Inchworms', muscle_group='Full Body'),
#             Exercise(name='Duck Walks', muscle_group='Legs'),
#             Exercise(name='Crab Walks', muscle_group='Full Body'),
#             Exercise(name='Bear Crawls', muscle_group='Full Body')
#         ]

#         db.session.add_all(exercises)
#         db.session.commit()
#         print("Exercises created successfully.")
#         return exercises
#     except Exception as e:
#         print(f"Error creating exercises: {e}")
#         db.session.rollback()


# def log_exercises(users, exercises):
#     try:
#         today = datetime.now().date()
#         for user in users:
#             for i in range(0, 30, 3):  # Log exercises for every 3rd day
#                 log_date = today - timedelta(days=i)
#                 for _ in range(3):  # Log exactly 3 exercises per day
#                     exercise = choice(exercises)
#                     exercise_log = ExerciseLog(
#                         date=log_date,
#                         exercise_name=exercise.name,
#                         muscle_group=exercise.muscle_group,

#                         user_id=user.id
#                     )
#                     db.session.add(exercise_log)
#         db.session.commit()
#         print("Exercises logged successfully.")
#     except Exception as e:
#         print(f"Error logging exercises: {e}")
#         db.session.rollback()


# def run():
#     clear_data()
#     users = create_users()
#     if users:
#         log_weights(users)
#         exercises = create_exercises()
#         if exercises:
#             log_exercises(users, exercises)

# if __name__ == '__main__':
#     with app.app_context():
#         run()



from app import app
from models import db, User, WeightLog, Exercise, ExerciseLog
from datetime import datetime, timedelta
from random import choice, uniform

def clear_data():
    try:
        db.drop_all()
        db.create_all()
        print("Database cleared and re-created successfully.")
    except Exception as e:
        print(f"Error clearing the database: {e}")

def create_users():
    try:
        users = [
            User(name='Kevin', email='kevin@example.com', height=178.0, weight=175.0, goal_weight=167.0, password='abc123'),
            User(name='Fab', email='fab@example.com', height=165.0, weight=165.0, goal_weight=1230.0, password='abc123')
        ]

        db.session.add_all(users)
        db.session.commit()
        print("Users created successfully.")
        return users
    except Exception as e:
        print(f"Error creating users: {e}")
        db.session.rollback()

def log_weights(users):
    try:
        today = datetime.now().date()
        for user in users:
            initial_weight = user.weight
            weight = initial_weight
            for i in range(0, 30, 3):  # Log weights every 3 days for the past 30 days
                days_passed = i
                if days_passed > 0:
                    # Randomly change the weight
                    change = uniform(-3.0, 3.0)  # Random change between -3.0 and 3.0 pounds
                    weight += change

                # Ensure weight does not increase or decrease too rapidly
                if weight > initial_weight + 5:
                    weight = initial_weight + 5
                elif weight < user.goal_weight:
                    weight = user.goal_weight

                weight_log = WeightLog(
                    date=today - timedelta(days=days_passed),
                    weight=weight,
                    user_id=user.id
                )
                db.session.add(weight_log)
        db.session.commit()
        print("Weights logged successfully.")
    except Exception as e:
        print(f"Error logging weights: {e}")
        db.session.rollback()

def create_exercises():
    try:
        exercises = [
            # LEGS
            Exercise(name='Squats', muscle_group='Legs', img="https://hips.hearstapps.com/hmg-prod/images/mature-strong-man-lifting-weights-at-cross-training-royalty-free-image-1651253779.jpg"),
            Exercise(name='Leg Press', muscle_group='Legs', img='https://cdn.mypowerlife.com/wp-content/uploads/2021/09/leg-press-for-glutes.jpg'),
            Exercise(name='Lunges', muscle_group='Legs', img='https://hips.hearstapps.com/hmg-prod/images/reverse-lunge-6400d8afcd348.jpg'),
            Exercise(name='Deadlifts', muscle_group='Legs', img='https://blogscdn.thehut.net/wp-content/uploads/sites/478/2018/10/12113512/Blog-Deadlifting-Male_1800x1200.jpg'),
            Exercise(name='Bulgarian Split Squats', muscle_group='Legs', img='https://images.ctfassets.net/8urtyqugdt2l/2s5tdGn6iABdoqEui2l2MN/d02a204930ba68ee6e4fd5981a71a44d/Bulgarian_Split_Squats.jpg'),
            Exercise(name='Step Ups', muscle_group='Legs', img='https://bod-blog-assets.prod.cd.beachbodyondemand.com/bod-blog/wp-content/uploads/2016/07/27114723/step-up-600-demo.jpg'),

            # CHEST
            Exercise(name='Bench Press', muscle_group='Chest', img="https://s3assets.skimble.com/assets/2289486/image_iphone.jpg"),
            Exercise(name='Incline Bench Press', muscle_group='Chest', img="https://cdn.muscleandstrength.com/sites/default/files/incline-bench-press.jpg"),
            Exercise(name='Decline Bench Press', muscle_group='Chest', img="https://www.hevyapp.com/wp-content/uploads/03011201-Dumbbell-Decline-Bench-Press_Chest.jpg"),
            Exercise(name='Push-ups', muscle_group='Chest', img='https://www.themanual.com/wp-content/uploads/sites/9/2021/11/push-ups.jpg?fit=2120%2C1414&p=1'),
            Exercise(name='Chest Flyes', muscle_group='Chest', img="https://static.strengthlevel.com/images/exercises/machine-chest-fly/machine-chest-fly-800.jpg"),
            Exercise(name='Chest Dips', muscle_group='Chest', img="https://cdn.muscleandstrength.com/sites/default/files/chest-dip.jpg"),

            # BACK
            Exercise(name='Pull-ups', muscle_group='Back', img='https://hips.hearstapps.com/hmg-prod/images/mh0418-fit-pul-01-1558554157.jpg'),
            Exercise(name='Bent Over Rows', muscle_group='Back', img='https://hips.hearstapps.com/hmg-prod/images/bent-over-row-1579627763.jpg?crop=0.862xw:0.576xh;0.0374xw,0.289xh&resize=980:*'),
            Exercise(name='Lat Pulldowns', muscle_group='Back', img='https://cdn.shopify.com/s/files/1/1497/9682/files/7--Standing-Straight-Arm-Lat-Pulldown.jpg?v=1666024796'),
            Exercise(name='Seated Rows', muscle_group='Back', img='https://www.lyfta.app/_next/image?url=%2Fthumbnails%2F08611201.jpg&w=3840&q=20'),
            Exercise(name='Face Pulls', muscle_group='Back', img='https://www.mensjournal.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cg_xy_center%2Cq_auto:good%2Cw_1200%2Cx_1314%2Cy_399/MTk3MTgxODA2Mjg4NTc3ODU1/facepullpromo.jpg'),
            Exercise(name='Single Arm Rows', muscle_group='Back', img='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStqmTme8WxQAgljFkv33l9n6BxbD1VJiHdGe4cOtnG-A&s'),

            # SHOULDERS
            Exercise(name='Overhead Press', muscle_group='Shoulders', img='https://www.dmoose.com/cdn/shop/articles/1_71d97192-f77f-47fa-a059-87456a2c1fb1.jpg?v=1647872386'),
            Exercise(name='Arnold Press', muscle_group='Shoulders', img='https://cdn.shopify.com/s/files/1/1497/9682/files/1.How_to_Do_The_Arnold_Press.jpg?v=1673014027'),
            Exercise(name='Lateral Raises', muscle_group='Shoulders', img='https://www.dmoose.com/cdn/shop/articles/Dumbbell_Lateral_Raise.jpg?v=1701860183'),
            Exercise(name='Front Raises', muscle_group='Shoulders', img='https://static.strengthlevel.com/images/exercises/dumbbell-front-raise/dumbbell-front-raise-800.jpg'),
            Exercise(name='Reverse Flyes', muscle_group='Shoulders', img='https://blog.healthadvocate.com/wp-content/uploads/2015/04/ThinkstockPhotos-469045988.jpg'),
            Exercise(name='Push Press', muscle_group='Shoulders', img='https://hips.hearstapps.com/hmg-prod/images/single-arm-push-press-1676898611.jpg'),

            # TRICEPS
            Exercise(name='Tricep Dips', muscle_group='Triceps', img='https://www.dmoose.com/cdn/shop/articles/1_2505ceb9-03f9-4543-a376-547c903565a0.jpg?v=1647856436'),
            Exercise(name='Tricep Extensions', muscle_group='Triceps', img='https://barbend.com/wp-content/uploads/2022/01/shutterstock_1484922215-1.jpg'),
            Exercise(name='Skull Crushers', muscle_group='Triceps', img='https://i.stack.imgur.com/2lC9W.png'),
            Exercise(name='Close Grip Bench Press', muscle_group='Triceps', img='https://static.strengthlevel.com/images/exercises/close-grip-bench-press/howto/close-grip-bench-press-howto-2-800.jpg'),
            Exercise(name='Overhead Tricep Extension', muscle_group='Triceps', img='https://www.dmoose.com/cdn/shop/articles/1_b930cb3e-8dac-4e45-9617-1d7b4594d264.png?v=1646823099'),
            Exercise(name='Tricep Pushdowns', muscle_group='Triceps', img='https://kinxlearning.com/cdn/shop/files/exercise-45_1000x.jpg?v=1613157966'),

            # BICEPS
            Exercise(name='Bicep Curls', muscle_group='Biceps', img='https://www.mensjournal.com/.image/t_share/MTk2MTM2MDgzMjI1MTI2NDA1/1-fat-grip-hammer-curl.jpg'),
            Exercise(name='Hammer Curls', muscle_group='Biceps', img='https://cdn.shopify.com/s/files/1/1876/4703/files/shutterstock_419477203_480x480.jpg?v=1636560233'),
            Exercise(name='Concentration Curls', muscle_group='Biceps', img='https://www.lyfta.app/_next/image?url=%2Fthumbnails%2F02971201.jpg&w=3840&q=20'),
            Exercise(name='Preacher Curls', muscle_group='Biceps', img='https://swolverine.com/cdn/shop/articles/Preacher_Curl_1024x.jpg?v=1662581126'),
            Exercise(name='Cable Curls', muscle_group='Biceps', img='https://www.dmoose.com/cdn/shop/articles/1_1_42ccb79d-1b2f-4bd6-a9d4-e886fb09fd06.png?v=1646826645'),
            Exercise(name='Chin-ups', muscle_group='Biceps', img='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLVTpaYAeTwvThBNLOWqW9xcTcjRLYJKFVgxdML29TdQ&s'),

            # FOREARMS
            Exercise(name='Wrist Curls', muscle_group='Forearms', img='https://cdn.shopify.com/s/files/1/0449/8453/3153/files/dumbbell_wrist_curls_muscles_worked_600x600.jpg?v=1693536778'),
            Exercise(name='Reverse Wrist Curls', muscle_group='Forearms', img='https://static.strengthlevel.com/images/exercises/dumbbell-reverse-wrist-curl/dumbbell-reverse-wrist-curl-800.jpg'),
            Exercise(name='Farmer Walks', muscle_group='Forearms', img='https://hips.hearstapps.com/hmg-prod/images/farmers-walk-1601465939.jpg'),
            Exercise(name='Reverse Curls', muscle_group='Forearms', img='https://www.dmoose.com/cdn/shop/articles/1_5b3195aa-428f-4a61-a3d0-a0eeef1e0f8d.jpg?v=1653395154'),
            Exercise(name='Grip Strengthener', muscle_group='Forearms', img='https://blackmountainproducts.com/wp-content/uploads/2017/05/HandGrip-Model_1800px.jpg'),
            Exercise(name='Forearm Plank', muscle_group='Forearms', img='https://cdn.shopify.com/s/files/1/1497/9682/files/2.Forearm_Plank.jpg?v=1673615791'),

            # CALVES
            Exercise(name='Calf Raises', muscle_group='Calves', img='https://media.gq.com/photos/5a4fe56aefd792474cf8ce17/master/pass/2018-01_GQ_FITNESS-Ask-a-Trainer-Calfs.jpg'),
            Exercise(name='Seated Calf Raises', muscle_group='Calves', img='https://static.strengthlevel.com/images/exercises/seated-calf-raise/seated-calf-raise-800.jpg'),
            Exercise(name='Standing Calf Raises', muscle_group='Calves', img='https://hips.hearstapps.com/hmg-prod/images/calf-raises-1610550932.jpg?resize=980:*'),
            Exercise(name='Donkey Calf Raises', muscle_group='Calves', img='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy39DcH0wIArsSK3EFlI7NyviHFkSq6JtUB4szcLsLhA&s'),
            Exercise(name='Calf Press on Leg Press Machine', muscle_group='Calves', img='https://www.hoistfitness.com/cdn/shop/products/HD-3403_CalfRaise_Finish_F.jpg'),
            Exercise(name='Box Jumps', muscle_group='Calves', img='https://www.shape.com/thmb/vjl1e7kTGi03OzRhDE7RecyJFpU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SHP_090922_BoxJump-2000-39769384f926455381ce241913ac4540.jpg'),

            # CORE
            Exercise(name='Crunches', muscle_group='Core', img='https://thefitnessmaverick.com/wp-content/uploads/2020/07/Sapstead_26-06-20_0-285-2-scaled-e1594978582753.jpg'),
            Exercise(name='Plank', muscle_group='Core', img='https://hips.hearstapps.com/hmg-prod/images/hdm119918mh15842-1545237096.png?crop=0.668xw:1.00xh;0.117xw,0&resize=1200:*'),
            Exercise(name='Russian Twists', muscle_group='Core', img='https://www.lyfta.app/_next/image?url=%2Fthumbnails%2F12471201.jpg&w=3840&q=20'),
            Exercise(name='Leg Raises', muscle_group='Core', img='https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2013/03/Muscular-Man-Working-Out-His-Lower-Abs-With-Lying-Leg-Raises-Exercise.jpg?quality=86&strip=all'),
            Exercise(name='Bicycle Crunches', muscle_group='Core', img='https://bod-blog-assets.prod.cd.beachbodyondemand.com/bod-blog/wp-content/uploads/2017/10/bb_bicycle-crunch.jpg'),
            Exercise(name='Side Plank', muscle_group='Core', img='https://experiencelife.lifetime.life/wp-content/uploads/2021/07/bid-side-plank.jpg'),

            # CARDIO
            Exercise(name='Jump Rope', muscle_group='Cardio', img='https://www.goodnet.org/photos/620x0/34143_hd.jpg'),
            Exercise(name='Burpees', muscle_group='Cardio', img='https://cdn.shopify.com/s/files/1/1497/9682/files/1.How_to_Do_a_Burpee.jpg?v=1671883119'),
            Exercise(name='Mountain Climbers', muscle_group='Cardio', img='https://i.pinimg.com/564x/db/be/77/dbbe77ae455ee19ab254ad6b0b64c56b.jpg'),
            Exercise(name='High Knees', muscle_group='Cardio', img='https://hips.hearstapps.com/hmg-prod/images/mh40-highknees-1660062564.jpg'),
            Exercise(name='Jumping Jacks', muscle_group='Cardio', img='https://www.researchgate.net/publication/341734848/figure/fig1/AS:896516470362114@1590757591713/Sample-of-Jumping-Jacks-Exercise-4.png'),
            Exercise(name='Running', muscle_group='Cardio', img='https://hips.hearstapps.com/hmg-prod/images/running-is-one-of-the-best-ways-to-stay-fit-royalty-free-image-1036780592-1553033495.jpg')
        ]

        db.session.add_all(exercises)
        db.session.commit()
        print("Exercises created successfully.")
        return exercises
    except Exception as e:
        print(f"Error creating exercises: {e}")
        db.session.rollback()

def log_exercises(users, exercises):
    try:
        today = datetime.now().date()
        for user in users:
            for i in range(0, 30, 3):  # Log exercises for every 3rd day
                log_date = today - timedelta(days=i)
                for _ in range(3):  # Log exactly 3 exercises per day
                    exercise = choice(exercises)
                    exercise_log = ExerciseLog(
                        date=log_date,
                        exercise_name=exercise.name,
                        muscle_group=exercise.muscle_group,
                        image_url=exercise.img,
                        user_id=user.id
                    )
                    db.session.add(exercise_log)
        db.session.commit()
        print("Exercises logged successfully.")
    except Exception as e:
        print(f"Error logging exercises: {e}")
        db.session.rollback()

def run():
    clear_data()
    users = create_users()
    if users:
        log_weights(users)
        exercises = create_exercises()
        if exercises:
            log_exercises(users, exercises)

if __name__ == '__main__':
    with app.app_context():
        run()
