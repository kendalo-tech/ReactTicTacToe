from flask import Flask, request, jsonify
from tttproblem import TTTProblem, TTTState
from adversarialsearch import minimax
from flask_cors import cross_origin
from flask_cors import CORS
# Initializing flask 
# app
app = Flask(__name__)
# CORS(app)
# CORS(app)

print("test")

@app.route("/")
@cross_origin()
def hello():
    return "Hello, World!"
 
@app.route("/test")
@cross_origin()
def get_test():
    print("test")
    data = {'message': 'Data from API'}
    return jsonify(data)


# Route for seeing a data
@app.route('/next-move', methods=['POST'])
@cross_origin()
def get_move():
    # frontend board info
    # 3x3 2d array with 'X', 'O', ' '(SPACE)s
    print("zzzzzzzzzzzzzzzzzzzz")
    board = request.get_json()['company']
    board = list(board)
    newBoard =[]
    for x in board:
        if x is None:
            newBoard.append(" ")
        else:
            newBoard.append(x)
    newBoard = [newBoard[0:3], newBoard[3:6], newBoard[6:9]]
    print(newBoard)
    t = TTTProblem(3, newBoard, 1)
    action = minimax(t) #(row, col)
    print(action)
    return jsonify(action)
 
     
# Running app
if __name__ == '__main__':
     app.run(debug=True)

