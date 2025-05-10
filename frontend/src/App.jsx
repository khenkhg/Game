import { useState, useEffect, useRef } from 'react';
import { playMove, aiMove, resetGame } from './api.js';
import Board from './components/Board.jsx';
import WinnerModal from './components/WinnerModal.jsx';
import CuteTimer from './components/CuteTimer.jsx';

export default function App() {
  const [board, setBoard] = useState([]);
  const [winner, setWinner] = useState(0);
  const [timer, setTimer] = useState(10);
  const [showGame, setShowGame] = useState(false);
  const intervalRef = useRef(null);
  const [lastMove, setLastMove] = useState(null);
  const [notification, setNotification] = useState('');
  const [isPlayerTurn, setIsPlayerTurn] = useState(true); // Initially, it's the player's turn
  const [draw, setDraw] = useState(false);
  const [timeoutLoss, setTimeoutLoss] = useState(false);

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTimer(10);
  };

  const startTimer = () => {
    resetTimer();
    intervalRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev === 1) {
          clearInterval(intervalRef.current);
          setTimeoutLoss(true);  // 👈 track that player lost due to timeout
          setWinner(2);          // AI wins
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleAIMove = async () => {
    try {
      const ai = await aiMove();
      if (!ai.error) {
        setBoard(ai.board);
        setWinner(ai.winner);
        setLastMove(ai.lastMove); // 👈 same here
        if (!ai.winner) {
          setIsPlayerTurn(true);  // Now it's the player's turn again
          startTimer(); // 🔁 Restart timer for human player
        }
      }
    } catch (err) {
      console.error("AI move error:", err);
    }
  };
  const isBoardFull = (board) => {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === 0) return false; // Empty spot found
      }
    }
    return true; // No empty spots, board is full
  };
  

  const handleClick = async (col) => {
    if (!isPlayerTurn || winner) return;
  
    try {
      const res = await playMove(col);
      if (res.error) {
        setNotification('Invalid move: Column is full!');
        setTimeout(() => setNotification(''), 3000); 
      } else {
        setBoard(res.board);
        setWinner(res.winner);
        setLastMove(res.lastMove);
  
        // Check for draw (board is full and no winner)
        if (!res.winner && isBoardFull(res.board)) {
          setDraw(true);
        }
  
        if (res.winner) {
          clearInterval(intervalRef.current);
        } else {
          resetTimer();
          setIsPlayerTurn(false); 
          setTimeout(() => {
            handleAIMove();
          }, 2000);
        }
      }
    } catch (err) {
      console.error("Error during move:", err);
    }
  };
  
  
  const handleStartGame = async () => {
    const data = await resetGame();
    setBoard(data.board);
    setWinner(0);
    setShowGame(true);
    setLastMove(null); // Reset lastMove when starting a new game
    setIsPlayerTurn(true); // Ensure it's the player's turn at the start
    startTimer();
  };

  if (!showGame) {
    return (
      <div className="welcome-container">
        <h1>🎉 Welcome to Connect Four! 🎉</h1>
        <button className="start-over-btn" onClick={handleStartGame}>Start</button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header-row">
        <h1>
        🌟 C<span className="o">
            <CuteTimer seconds={timer} />
          </span>nnect Four 🌟
        </h1>
      </div>
      {!isPlayerTurn && (
        <div className="ai-thinking">
          <p>AI is thinking...</p>
          <div className="loading-spinner"></div>
        </div>
      )}

      {notification && (
        <div className="toast-notification">
          {notification}
        </div>
      )}
      <Board
        board={board}
        onColumnClick={handleClick}
        lastMove={lastMove}
        disabled={!isPlayerTurn} // Disable clicks if it's not the player's turn
      />
      {draw && (
        <WinnerModal
          winner={0} // No winner
          message="It's a Draw!"
          onStartOver={() => {
            clearInterval(intervalRef.current);
            setWinner(0);
            setDraw(false);
            setShowGame(false);
          }}
        />
      )}
      {winner !== 0 && (
        <WinnerModal
          winner={winner}
          message={timeoutLoss ? "⏰ Time's up! AI wins by timeout." : undefined}
          onStartOver={() => {
            clearInterval(intervalRef.current);
            setWinner(0);
            setTimeoutLoss(false);  // Reset the flag
            setShowGame(false);
          }}
        />
      )}

      
    </div>
  );
  
  
}
