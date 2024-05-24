from tttproblem import TTTProblem, TTTState
from adversarialsearch import minimax

X = "X"
O = "O"
SPACE = " "
testBoard = [[SPACE, X, SPACE], 
             [SPACE, SPACE, SPACE], 
             [SPACE, SPACE, SPACE]]

t = TTTProblem(3, testBoard, 1)
action = minimax(t)
newState = t.transition(TTTState(testBoard, 1), action)
print("next move: ", action)
print("new board: \n", t.board_to_pretty_string(newState.board))

newState = t.transition(newState, ((0,0)))
print("new board: \n", t.board_to_pretty_string(newState.board))

t.set_start_state(newState)
action = minimax(t)
print("next move: ", action)
newState = t.transition(newState, action)
print("new board: \n", t.board_to_pretty_string(newState.board))


newState = t.transition(newState, ((1,1)))
print("new board: \n", t.board_to_pretty_string(newState.board))

t.set_start_state(newState)
action = minimax(t)
print("next move: ", action)
newState = t.transition(newState, action)
print("new board: \n", t.board_to_pretty_string(newState.board))

newState = t.transition(newState, ((1,2)))
print("new board: \n", t.board_to_pretty_string(newState.board))

t.set_start_state(newState)
action = minimax(t)
print("next move: ", action)
newState = t.transition(newState, action)
print("new board: \n", t.board_to_pretty_string(newState.board))