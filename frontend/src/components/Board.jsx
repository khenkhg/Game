import Cell from './Cell';

export default function Board({ board, onColumnClick, lastMove }) {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => {
            const isLast = lastMove && lastMove[0] === rowIndex && lastMove[1] === colIndex;
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="cell-wrapper"
                onClick={() => onColumnClick(colIndex)}
              >
                <Cell value={cell} isLast={isLast} />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
