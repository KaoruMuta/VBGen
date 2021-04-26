from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/how_to_use')
def how_to_use():
    return render_template('how_to_use.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.errorhandler(404)
def not_found(error):
    return render_template('not_found.html'), 404

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')