import os
import config

from flask import Flask
from flask import render_template
from flask import request
from flask import redirect
from flask import url_for
from flask import session
from werkzeug.utils import secure_filename
from datetime import timedelta

ABSOLUTE_UPLOAD_FOLDER = './app/static/upload/'
UPLOAD_FOLDER = '/static/upload/'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = ABSOLUTE_UPLOAD_FOLDER
app.secret_key = config.SECRET_KEY
app.permanent_session_lifetime = timedelta(minutes=1)

@app.route('/')
def index():
    if 'path' in session:
        img_path = session['path']
        return render_template('index.html', img_path=img_path)
    else:
        return render_template('index.html')

@app.errorhandler(404)
def not_found(error):
    return render_template('not_found.html'), 404

# reference: https://flask.palletsprojects.com/en/1.1.x/patterns/fileuploads/
@app.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return redirect(url_for('index'))
    file = request.files['file']

    if file.filename == '':
        return redirect(url_for('index'))
    # upload image to specific folder
    if file:
        filename = secure_filename(file.filename)
        # img_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        print(os.getcwd())
        img_path = os.path.join('/app/static/upload', filename)
        file.save(img_path)
        rendering_img_path = os.path.join(UPLOAD_FOLDER, filename)
        session['path'] = rendering_img_path
        return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')