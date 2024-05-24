from typing import Callable

from adversarialsearchproblem import (
    Action,
    AdversarialSearchProblem,
    State as GameState,
)

def minimax(asp: AdversarialSearchProblem[GameState, Action]) -> Action:
    """
    Implement the minimax algorithm on ASPs, assuming that the given game is
    both 2-player and constant-sum.

    Input:
        asp - an AdversarialSearchProblem
    Output:
        an action (an element of asp.get_available_actions(asp.get_start_state()))
    """
    best_action = None
    init_min_val = float('-inf')
    start_state = asp.get_start_state()
    for a in asp.get_available_actions(start_state):
        v = min_val(asp, asp.transition(start_state, a), start_state.player_to_move())
        if v > init_min_val:
            init_min_val = v
            best_action = a
    return best_action

def max_val(asp: AdversarialSearchProblem[GameState, Action], state, player):
    if asp.is_terminal_state(state):
        return asp.evaluate_terminal(state)[player]
    v = float('-inf')
    for a in asp.get_available_actions(state):
        v = max(v, min_val(asp, asp.transition(state, a), player))
    return v

def min_val(asp: AdversarialSearchProblem[GameState, Action], state, player):
    if asp.is_terminal_state(state):
        return asp.evaluate_terminal(state)[player]
    v = float('inf')
    for a in asp.get_available_actions(state):
        v = min(v, max_val(asp, asp.transition(state, a), player))
    return v
