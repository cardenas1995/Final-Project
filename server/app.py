
# import os
# from flask import Flask, request, session, jsonify
# from flask_cors import CORS
# from flask_migrate import Migrate
# from models import db, User, WeightLog, Exercise, ExerciseLog

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.secret_key = os.environ.get('SECRET_KEY')

# db.init_app(app)
# Migrate(app, db)

# # Allow CORS and include credentials
# CORS(app, supports_credentials=True, origins=['http://localhost:5174'])

# @app.route("/", methods=["GET"])
# def api():
#     return "whoooo"

# @app.route('/signup', methods=['POST'])
# def signup():
#     data = request.get_json()
#     name = data.get('name')
#     email = data.get('email')
#     password = data.get('password')
#     height = float(data.get('height'))
#     weight = float(data.get('weight'))
#     goal_weight = float(data.get('goal_weight'))

#     user = User(name=name, email=email, password=password, height=height, weight=weight, goal_weight=goal_weight)
#     db.session.add(user)
#     db.session.commit()
#     return jsonify({"message": "User created successfully"}), 201

# @app.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     email = data.get('email')
#     password = data.get('password')
#     user = User.query.filter_by(email=email).first()
#     if user and user.password == password:
#         session['user_id'] = user.id
#         session.modified = True
#         return jsonify({"message": "Login successful"}), 200
#     return jsonify({"message": "Invalid login credentials"}), 401

# @app.route('/logout', methods=['POST'])
# def logout():
#     session.pop('user_id', None)
#     return jsonify({"message": "Logout successful"}), 200

# def get_current_user():
#     # user_id = session.get('user_id')
#     user_id = 1
#     app.logger.info(f'Session user_id: {user_id}')
#     if user_id:
#         return User.query.get(user_id)
#     return None

# @app.route('/profile', methods=['GET', 'POST'])
# def profile():
#     current_user = get_current_user()
#     if not current_user:
#         return jsonify({"message": "Unauthorized"}), 401

#     if request.method == 'POST':
#         data = request.get_json()
#         weight = float(data.get('weight'))
#         new_weight_log = WeightLog(weight=weight, user_id=current_user.id)
#         db.session.add(new_weight_log)
#         db.session.commit()
#         return jsonify({"message": "Weight updated successfully"}), 200

#     user_data = current_user.serialize()
#     weight_logs = WeightLog.query.filter_by(user_id=current_user.id).all()
#     user_data['weight_logs'] = [log.serialize() for log in weight_logs]

#     return jsonify({"user": user_data}), 200

# @app.route('/exercises', methods=['GET', 'POST'])
# def exercises():
#     current_user = get_current_user()
#     if not current_user:
#         return jsonify({"message": "Unauthorized"}), 401

#     if request.method == 'POST':
#         data = request.get_json()
#         exercise_name = data.get('exercise_name')
#         muscle_group = data.get('muscle_group')
#         image_url = data.get('image_url')
#         exercise_log = ExerciseLog(exercise_name=exercise_name, muscle_group=muscle_group, image_url=image_url, user_id=current_user.id)
#         db.session.add(exercise_log)
#         db.session.commit()
#         return jsonify({"message": "Exercise added!"}), 201

#     exercises = ExerciseLog.query.filter_by(user_id=current_user.id).all()
#     return jsonify([exercise.serialize() for exercise in exercises]), 200

# @app.route('/delete_exercise/<int:id>', methods=['DELETE'])
# def delete_exercise(id):
#     current_user = get_current_user()
#     if not current_user:
#         return jsonify({"message": "Unauthorized"}), 401

#     exercise_to_delete = ExerciseLog.query.get_or_404(id)
#     if exercise_to_delete.user_id != current_user.id:
#         return jsonify({"message": "You're not authorized to delete this exercise"}), 403

#     db.session.delete(exercise_to_delete)
#     db.session.commit()
#     return jsonify({"message": "Exercise deleted"}), 200

# @app.route('/activity', methods=['GET'])
# def activity():
#     current_user = get_current_user()
#     if not current_user:
#         return jsonify({"message": "Unauthorized"}), 401

#     date = request.args.get('date')
#     activities = ExerciseLog.query.filter_by(user_id=current_user.id, date=date).all()
#     weight = WeightLog.query.filter_by(user_id=current_user.id, date=date).first()
#     return jsonify({
#         "activities": [activity.serialize() for activity in activities],
#         "weight": weight.serialize() if weight else None
#     }), 200

# if __name__ == '__main__':
#     app.run(debug=True, port=5555)






import os
from flask import Flask, request, session, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from models import db, User, WeightLog, Exercise, ExerciseLog
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = os.environ.get('SECRET_KEY')

db.init_app(app)
Migrate(app, db)

# Allow CORS and include credentials
CORS(app, supports_credentials=True, origins=['http://localhost:5174'])

@app.route("/", methods=["GET"])
def api():
    return "whoooo"

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    height = float(data.get('height'))
    weight = float(data.get('weight'))
    goal_weight = float(data.get('goal_weight'))

    user = User(name=name, email=email, password=password, height=height, weight=weight, goal_weight=goal_weight)
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User created successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    user = User.query.filter_by(email=email).first()
    if user and user.password == password:
        session['user_id'] = user.id
        session.modified = True
        return jsonify({"message": "Login successful"}), 200
    return jsonify({"message": "Invalid login credentials"}), 401

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({"message": "Logout successful"}), 200

def get_current_user():
    user_id = 1
    app.logger.info(f'Session user_id: {user_id}')
    if user_id:
        return User.query.get(user_id)
    return None

@app.route('/profile', methods=['GET', 'POST'])
def profile():
    current_user = get_current_user()
    if not current_user:
        return jsonify({"message": "Unauthorized"}), 401

    if request.method == 'POST':
        data = request.get_json()
        weight = float(data.get('weight'))
        new_weight_log = WeightLog(weight=weight, user_id=current_user.id)
        db.session.add(new_weight_log)
        db.session.commit()
        return jsonify({"message": "Weight updated successfully"}), 200

    user_data = current_user.serialize()
    weight_logs = WeightLog.query.filter_by(user_id=current_user.id).all()
    user_data['weight_logs'] = [log.serialize() for log in weight_logs]

    return jsonify({"user": user_data}), 200

@app.route('/exercises', methods=['GET', 'POST'])
def exercises():
    current_user = get_current_user()
    if not current_user:
        return jsonify({"message": "Unauthorized"}), 401

    if request.method == 'POST':
        data = request.get_json()
        exercise_name = data.get('exercise_name')
        muscle_group = data.get('muscle_group')
        image_url = data.get('image_url')
        exercise_log = ExerciseLog(exercise_name=exercise_name, muscle_group=muscle_group, image_url=image_url, user_id=current_user.id)
        db.session.add(exercise_log)
        db.session.commit()
        return jsonify({"message": "Exercise added!"}), 201

    exercises = ExerciseLog.query.filter_by(user_id=current_user.id).all()
    return jsonify([exercise.serialize() for exercise in exercises]), 200

@app.route('/delete_exercise/<int:id>', methods=['DELETE'])
def delete_exercise(id):
    current_user = get_current_user()
    if not current_user:
        return jsonify({"message": "Unauthorized"}), 401

    exercise_to_delete = ExerciseLog.query.get_or_404(id)
    if exercise_to_delete.user_id != current_user.id:
        return jsonify({"message": "You're not authorized to delete this exercise"}), 403

    db.session.delete(exercise_to_delete)
    db.session.commit()
    return jsonify({"message": "Exercise deleted"}), 200

@app.route('/api/activity', methods=['GET'])
def get_activity_logs():
    month = request.args.get('month')
    year = request.args.get('year')
    user_id = 1

    if not month or not year or not user_id:
        return jsonify({"error": "Month, year, and user_id are required"}), 400

    start_date = datetime(int(year), int(month), 1)
    end_date = datetime(int(year), int(month) + 1, 1) if int(month) < 12 else datetime(int(year) + 1, 1, 1)

    exercise_logs = ExerciseLog.query.filter(
        ExerciseLog.user_id == user_id,
        ExerciseLog.date >= start_date,
        ExerciseLog.date < end_date
    ).all()

    logs = [{
        "date": log.date.strftime('%Y-%m-%d'),
        "exercise_name": log.exercise_name,
        "muscle_group": log.muscle_group,
        "img": log.image_url
    } for log in exercise_logs]

    return jsonify(logs), 200

if __name__ == '__main__':
    app.run(debug=True, port=5555)

