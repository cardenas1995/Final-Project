import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt

# Import models
from models import db, User, Exercise, WeightLog, Activity

app = Flask(__name__)
# Example configuration
bcrypt = Bcrypt(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///exercises.db'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key'

# Initialize SQLAlchemys



# Now you can use db.init_app, though it's already implicitly done by passing `app` in the constructor
# db.init_app(app)  # This line is actually redundant if you pass `app` when instantiating SQLAlchemy

# Initialize Migrate
migrate = Migrate(app, db)
db.init_app(app)