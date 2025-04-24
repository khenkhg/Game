// components/CuteTimer.jsx
import { motion } from "framer-motion";
import '../index.css';

export default function CuteTimer({ seconds }) {
  const radius = 18;
  const stroke = 8;
  const circumference = 2 * Math.PI * radius;
  const progress = (seconds / 10) * circumference;

  return (
    <div className="cute-timer-container">
      <svg width="50" height="50" viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={stroke}
          fill="none"
        />
        <motion.circle
          cx="25"
          cy="25"
          r={radius}
          stroke="#8b5cf6"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1 }}
        />
      </svg>
      <div className="cute-timer-text">{seconds}s</div>
    </div>
  );
}
