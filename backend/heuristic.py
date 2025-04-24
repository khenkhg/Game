def evaluate(board, player, depth=0, max_depth=5):
    if depth == max_depth:
        return 0  # No further evaluation if we reach max depth

    score = 0
    
    # Horizontal evaluation
    for row in board:
        for i in range(len(row) - 3):
            window = row[i:i+4]
            score += score_window(window, player)
    
    # Vertical evaluation
    for col in range(len(board[0])):
        for row in range(len(board) - 3):
            window = [board[row+i][col] for i in range(4)]
            score += score_window(window, player)
    
    # Diagonal (positive slope) evaluation
    for row in range(len(board) - 3):
        for col in range(len(board[0]) - 3):
            window = [board[row+i][col+i] for i in range(4)]
            score += score_window(window, player)
    
    # Diagonal (negative slope) evaluation
    for row in range(3, len(board)):
        for col in range(len(board[0]) - 3):
            window = [board[row-i][col+i] for i in range(4)]
            score += score_window(window, player)
    
    # Recursively evaluate next depth if needed (for Minimax algorithm)
    if depth < max_depth:
        return score
    
    return score

def score_window(window, player):
    opponent = 3 - player
    score = 0
    
    # Check for a winning window
    if window.count(player) == 4:
        score += 100
    elif window.count(player) == 3 and window.count(0) == 1:
        score += 10
    elif window.count(player) == 2 and window.count(0) == 2:
        score += 5
    
    # Check for opponent's winning opportunities
    if window.count(opponent) == 3 and window.count(0) == 1:
        score -= 8

    return score
