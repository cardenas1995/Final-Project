import os
from flask import Flask, request,session
from datetime import datetime
from flask_cors import CORS
from flask_migrate import Migrate


from models import db, User, WeightLog, Exercise, UserExerciseLog


app = Flask(__name__)
# set the db connection string
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URI']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# set a secret key (needed for browser cookies)
app.secret_key = os.environ['SECRET_KEY']

# initialize the sqlalchemy db
db.init_app(app)
# initialize alembic (migration framework)
Migrate(app, db)
# initialize CORS
CORS(app, supports_credentials=True)


@app.route("/", methods=["GET"])
def api():
    return "whoooo"

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        password = request.form.get('password')
        height = float(request.form.get('height'))
        weight = float(request.form.get('weight'))
        goal_weight = float(request.form.get('goal_weight'))

        user = User(name=name, email=email, password=generate_password_hash(password), height=height, weight=weight, goal_weight=goal_weight)
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return redirect(url_for('profile'))

    return render_template('signup.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        user = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password, password):
            login_user(user)
            return redirect(url_for('profile'))
        else:
            flash('Invalid login credentials')
    return render_template('login.html')

@app.route('/logout')

def logout():
    logout_user()
    return redirect(url_for('login'))

# Profile Management

@app.route('/profile', methods=['GET', 'POST'])

def profile():
    if request.method == 'POST':
        weight = float(request.form.get('weight'))
        new_weight_log = WeightLog(weight=weight, user_id=current_user.id)
        db.session.add(new_weight_log)
        db.session.commit()
        flash('Weight updated successfully!')
    return render_template('profile.html', user=current_user)

# Exercise Management

@app.route('/exercises', methods=['GET', 'POST'])

def exercises():
    if request.method == 'POST':
        exercise_name = request.form.get('exercise_name')
        exercise_log = ExerciseLog(exercise_name=exercise_name, user_id=current_user.id)
        db.session.add(exercise_log)
        db.session.commit()
        flash('Exercise added!')
    return render_template('exercises.html', exercises=current_user.exercises)

@app.route('/add_exercise', methods=['POST'])

def add_exercise():
    exercise_name = request.form.get('exercise_name')
    image_url = request.form.get('image_url')
    user_exercise = UserExercise(exercise_name=exercise_name, image_url=image_url, user_id=current_user.id)
    db.session.add(user_exercise)
    db.session.commit()
    return redirect(url_for('exercises'))

@app.route('/delete_exercise/<int:id>', methods=['POST'])

def delete_exercise(id):
    exercise_to_delete = ExerciseLog.query.get_or_404(id)
    if exercise_to_delete.user_id != current_user.id:
        flash("You're not authorized to delete this exercise")
        return redirect(url_for('exercises'))
    db.session.delete(exercise_to_delete)
    db.session.commit()
    return redirect(url_for('exercises'))

# Activity Viewing

@app.route('/activity', methods=['GET'])

def activity():
    date = request.args.get('date')
    activities = ExerciseLog.query.filter_by(user_id=current_user.id, date=date).all()
    weight = WeightLog.query.filter_by(user_id=current_user.id, date=date).first()
    return render_template('activity.html', activities=activities, weight=weight)