import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from flask import Flask, request, jsonify
from game import ConnectFour
from minimax import minimax
from flask_cors import CORS

game = ConnectFour()
app = Flask(__name__)
CORS(app)

@app.route('/play', methods=['POST'])
def play():
    col = request.json['column']
    if game.make_move(col):
        winner = game.check_winner()
        game.switch_player()
        return jsonify({'board': game.board, 'winner': winner, 'lastMove': game.last_move})
    return jsonify({'error': 'Invalid move'}), 400

@app.route('/ai_move', methods=['POST'])
def ai_move():
    _, col = minimax(game.board, 5, float('-inf'), float('inf'), True, game.current_player)
    if col is not None:
        game.make_move(col)
        winner = game.check_winner()
        game.switch_player()
        return jsonify({'column': col, 'board': game.board, 'winner': winner, 'lastMove': game.last_move})
    return jsonify({'error': 'No valid moves'}), 400

@app.route('/reset', methods=['POST'])
def reset():
    game.reset()
    return jsonify({'board': game.board})

if __name__ == '__main__':
    app.run(debug=True)
