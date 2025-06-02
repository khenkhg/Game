// components/WinnerModal.jsx
import { motion } from "framer-motion";

export default function WinnerModal({ winner, message, onStartOver }) {
  return (
    <div className="modal-overlay">
      <motion.div
        className="winner-modal"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <h2>🎉 Player {winner} Wins! 🎉</h2>
        {message && <p className="timeout-message">{message}</p>}
        <button onClick={onStartOver} className="start-over-btn">
          Start Over
        </button>
      </motion.div>
    </div>
  );
}
