from flask import Flask, jsonify,render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # enable CORS globally

@app.route("/")
def home():
    return "Flask backend is running!"

@app.route("/api/hello")
def hello():
    return jsonify({"message": "Hello from Flask and Harsh!"})

@app.route("/api/board")
def get_board():
    board = [
        ["r","n","b","q","k","b","n","r"],
        ["p","p","p","p","p","p","p","p"],
        [".",".",".",".",".",".",".","."],
        [".",".",".",".",".",".",".","."],
        [".",".",".",".",".",".",".","."],
        [".",".",".",".",".",".",".","."],
        ["P","P","P","P","P","P","P","P"],
        ["R","N","B","Q","K","B","N","R"]
    ]
    return jsonify({"board": board})

@app.route("/about")
def about():
    return jsonify()

if __name__ == "__main__":
    app.run(debug=True)  # run on http://127.0.0.1:5000
