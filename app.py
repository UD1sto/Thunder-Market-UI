from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def hello():
    return render_template('home.html')

@app.route('/logic')
def logic():
    try:
        return render_template('logic.html')
    except Exception as e:
        app.logger.error(f"Error rendering logic.html: {str(e)}")
        return render_template('logic.html')


if __name__ == '__main__':
    app.run(debug=True)