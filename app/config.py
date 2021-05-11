import os
from dotenv import load_dotenv

load_dotenv()
SECRET_KEY = os.getenv('SECRET_KEY')    # also added key to heroku for deployment (`heroku config:set ..`)