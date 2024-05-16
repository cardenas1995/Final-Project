from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime


from sqlalchemy.orm import validates
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt
from sqlalchemy.ext.hybrid import hybrid_property

convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

db = SQLAlchemy(metadata=MetaData(naming_convention=convention))
bcrypt = Bcrypt()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    height = db.Column(db.Float, nullable=False)
    current_weight = db.Column(db.Float, nullable=False)
    goal_weight = db.Column(db.Float, nullable=False)
    weights = relationship('WeightLog', backref='user', lazy='dynamic')
    exercises = relationship('UserExerciseLog', backref='user', lazy='dynamic')

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

class WeightLog(db.Model):
    __tablename__ = 'weight_logs'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, default=datetime.utcnow)
    weight = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, ForeignKey('users.id'))

class Exercise(db.Model):
    __tablename__ = 'exercises'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    muscle_group = db.Column(db.String(100))
    description = db.Column(db.String(255))

class UserExerciseLog(db.Model):
    __tablename__ = 'user_exercise_logs'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, default=datetime.utcnow)
    exercise_id = db.Column(db.Integer, ForeignKey('exercises.id'))
    user_id = db.Column(db.Integer, ForeignKey('users.id'))