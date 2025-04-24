ROWS = 6
COLS = 7

class ConnectFour:
    def __init__(self):
        self.board = [[0 for _ in range(COLS)] for _ in range(ROWS)]
        self.current_player = 1

    def reset(self):
        self.__init__()

    def make_move(self, col):
        if col < 0 or col >= COLS or self.board[0][col] != 0:
            return False
        for row in reversed(range(ROWS)):
            if self.board[row][col] == 0:
                self.board[row][col] = self.current_player
                self.last_move = (row, col)  # 👈 Track last move
                return True
        return False


    def switch_player(self):
        self.current_player = 3 - self.current_player

    def get_valid_moves(self):
        return [c for c in range(COLS) if self.board[0][c] == 0]

    def is_full(self):
        return all(self.board[0][c] != 0 for c in range(COLS))

    def check_winner(self):
        def check_dir(x, y, dx, dy):
            val = self.board[x][y]
            if val == 0:
                return False
            for _ in range(3):
                x += dx
                y += dy
                if not (0 <= x < ROWS and 0 <= y < COLS and self.board[x][y] == val):
                    return False
            return True

        for x in range(ROWS):
            for y in range(COLS):
                if (check_dir(x, y, 1, 0) or check_dir(x, y, 0, 1) or
                    check_dir(x, y, 1, 1) or check_dir(x, y, 1, -1)):
                    return self.board[x][y]
        return 0
