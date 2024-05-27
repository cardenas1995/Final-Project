# from datetime import datetime
# from flask_sqlalchemy import SQLAlchemy

# db = SQLAlchemy()

# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(50), nullable=False)
#     email = db.Column(db.String(120), unique=True, nullable=False)
#     password = db.Column(db.String(128), nullable=False)
#     height = db.Column(db.Float, nullable=False)
#     weight = db.Column(db.Float, nullable=False)
#     goal_weight = db.Column(db.Float, nullable=False)
#     weight_logs = db.relationship('WeightLog', backref='user', lazy=True)
#     exercise_logs = db.relationship('ExerciseLog', backref='user', lazy=True)

#     def serialize(self):
#         return {
#             'id': self.id,
#             'name': self.name,
#             'email': self.email,
#             'height': self.height,
#             'weight': self.weight,
#             'goal_weight': self.goal_weight
#         }

# class WeightLog(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     weight = db.Column(db.Float, nullable=False)
#     date = db.Column(db.Date, default=datetime.utcnow)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

#     def serialize(self):
#         return {
#             'id': self.id,
#             'weight': self.weight,
#             'date': self.date.isoformat(),
#             'user_id': self.user_id
#         }

# class ExerciseLog(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     exercise_name = db.Column(db.String(50), nullable=False)
#     muscle_group = db.Column(db.String(50), nullable=False)
#     date = db.Column(db.Date, default=datetime.utcnow)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

#     def serialize(self):
#         return {
#             'id': self.id,
#             'exercise_name': self.exercise_name,
#             'muscle_group': self.muscle_group,
#             'date': self.date.isoformat(),
#             'user_id': self.user_id
#         }

# class Exercise(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(50), nullable=False)
#     muscle_group = db.Column(db.String(50), nullable=False)

#     def serialize(self):
#         return {
#             'id': self.id,
#             'name': self.name,
#             'muscle_group': self.muscle_group
#         }

#     def serialize(self):
#         return {
#             'id': self.id,
#             'name': self.name,
#             'muscle_group': self.muscle_group
#         }






from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    height = db.Column(db.Float, nullable=False)
    weight = db.Column(db.Float, nullable=False)
    goal_weight = db.Column(db.Float, nullable=False)
    weight_logs = db.relationship('WeightLog', backref='user', lazy=True)
    exercise_logs = db.relationship('ExerciseLog', backref='user', lazy=True)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'height': self.height,
            'weight': self.weight,
            'goal_weight': self.goal_weight
        }

class WeightLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    weight = db.Column(db.Float, nullable=False)
    date = db.Column(db.Date, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'weight': self.weight,
            'date': self.date.isoformat(),
            'user_id': self.user_id
        }

class ExerciseLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    exercise_name = db.Column(db.String(50), nullable=False)
    muscle_group = db.Column(db.String(50), nullable=False)
    date = db.Column(db.Date, default=datetime.utcnow)
    image_url = db.Column(db.String(255), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'exercise_name': self.exercise_name,
            'muscle_group': self.muscle_group,
            'date': self.date.isoformat(),
            'image_url': self.image_url,
            'user_id': self.user_id
        }

class Exercise(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    muscle_group = db.Column(db.String(50), nullable=False)
    difficulty = db.Column(db.String(50), nullable=True)
    push_pull = db.Column(db.String(50), nullable=True)
    img = db.Column(db.String(255), nullable=True)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'muscle_group': self.muscle_group,
            'difficulty': self.difficulty,
            'push_pull': self.push_pull,
            'img': self.img
        }