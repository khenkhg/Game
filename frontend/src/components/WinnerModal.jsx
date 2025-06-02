export default function WinnerModal({ winner, onStartOver }) {
  return (
    <div className="modal-overlay">
      <motion.div className="winner-modal" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
        <h2>🎉 Player {winner} Wins! 🎉</h2>
        <button onClick={onStartOver} className="start-over-btn">
          Start Over
        </button>
      </motion.div>
    </div>
  );
}
