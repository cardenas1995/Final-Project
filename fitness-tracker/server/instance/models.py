from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData


metadata = MetaData(
    naming_convention={
        "fk": "fk%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)

db = SQLAlchemy(metadata=metadata)



class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    is_active = db.Column(db.Boolean, default=True)




class Exercise(db.Model):
    __tablename__ = 'exercises'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    muscle_group = db.Column(db.String(50), nullable=False)
    difficulty = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f'<Exercise {self.name}>'

class Activity(db.Model):
    __tablename__ = 'activities'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    description = db.Column(db.String(255), nullable=True)  # Optional field

    def __repr__(self):
        return f'<Activity {self.date} User {self.user_id}>'

class WeightLog(db.Model):

    __tablename__ = 'weight_logs'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    weight = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def __repr__(self):
        return f'<WeightLog {self.date} for User {self.user_id}>'
