export default function Cell({ value, isLast }) {
  let className = 'cell';
  if (value === 1) className += ' player-1';
  if (value === 2) className += ' player-2';
  if (isLast) className += ' last-move';
  return <div className={className}></div>;
}
