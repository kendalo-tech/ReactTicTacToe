from flask import Flask, request
from tttproblem import TTTProblem, TTTState
from adversarialsearch import minimax
# Initializing flask app
app = Flask(__name__)
 

@app.route("/")
def hello():
    return "Hello, World!"
 
# Route for seeing a data
@app.route('/next-move')
def get_move():
    # frontend board info
    # 3x3 2d array with 'X', 'O', ' '(SPACE)s
    board = request.get_json()
    t = TTTProblem(3, board, 1)
    action = minimax(t) #(row, col

    return action
 
     
# Running app
if __name__ == '__main__':
    app.run(debug=True)