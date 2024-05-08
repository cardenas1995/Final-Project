import request, jsonify, abort
from .models import db, User, Exercise, Activity, WeightLog
from . import app

@app.route('/')
def home():
    return "Welcome to the Fitness Tracker API!"

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')  # Reminder to hash passwords in actual implementations
    if username and email and password:
        new_user = User(username=username, email=email, password=password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User created successfully'}), 201
    return abort(400, description="Missing username, email, or password")

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify({'username': user.username, 'email': user.email})

@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.get_json()
    new_user = User(username=data['username'], email=data['email'], password=data['password'])
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User added successfully!'}), 201
    except Exception as e:
        db.session.rollback()
        print(f"Failed to add user: {e}")
        return jsonify({'error': 'Unable to add user'}), 500


@app.route('/exercises', methods=['GET'])
def get_exercises():
    exercises = Exercise.query.all()
    return jsonify({'exercises': [{ 'name': ex.name, 'muscle_group': ex.muscle_group, 'difficulty': ex.difficulty} for ex in exercises]})

@app.route('/log_activity', methods=['POST'])
def log_activity():
    data = request.get_json()
    user_id = data.get('user_id')
    date = data.get('date')
    if user_id and date:
        new_activity = Activity(date=date, user_id=user_id)
        db.session.add(new_activity)
        db.session.commit()
        return jsonify({'message': 'Activity logged successfully'}), 201
    return abort(400, description="Missing user ID or date")
