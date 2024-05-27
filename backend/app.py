from flask import Flask, request
from tttproblem import TTTProblem, TTTState
from adversarialsearch import minimax
from flask_cors import cross_origin
from flask_cors import CORS
# Initializing flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
 

@app.route("/")
@cross_origin()
def hello():
    return "Hello, World!"
 
# Route for seeing a data
@app.route('/next-move')
@cross_origin()
def get_move():
    # frontend board info
    # 3x3 2d array with 'X', 'O', ' '(SPACE)s
    print("zzzzzzzzzzzzzzzzzzzz")
    board = request.get_json()
    print("random", board)
    t = TTTProblem(3, board, 1)
    action = minimax(t) #(row, col

    return action
 
     
# Running app
if __name__ == '__main__':
     app.run(debug=True, port=5173)

