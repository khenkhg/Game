from copy import deepcopy
from heuristic import evaluate
from game import ConnectFour

DEPTH = 5

def minimax(board, depth, alpha, beta, maximizing_player, player):
    valid_moves = [c for c in range(7) if board[0][c] == 0]
    winner = check_terminal(board)
    if depth == 0 or winner:
        return evaluate(board, player), None

    best_col = valid_moves[0]
    if maximizing_player:
        max_eval = float('-inf')
        for col in valid_moves:
            temp_board = deepcopy(board)
            drop_piece(temp_board, col, player)
            eval_score, _ = minimax(temp_board, depth - 1, alpha, beta, False, player)
            if eval_score > max_eval:
                max_eval = eval_score
                best_col = col
            alpha = max(alpha, eval_score)
            if beta <= alpha:
                break
        return max_eval, best_col
    else:
        min_eval = float('inf')
        for col in valid_moves:
            temp_board = deepcopy(board)
            drop_piece(temp_board, col, 3 - player)
            eval_score, _ = minimax(temp_board, depth - 1, alpha, beta, True, player)
            if eval_score < min_eval:
                min_eval = eval_score
                best_col = col
            beta = min(beta, eval_score)
            if beta <= alpha:
                break
        return min_eval, best_col


def drop_piece(board, col, player):
    for row in reversed(range(6)):
        if board[row][col] == 0:
            board[row][col] = player
            break


def check_terminal(board):
    game = ConnectFour()
    game.board = board
    return game.check_winner() != 0 or game.is_full()