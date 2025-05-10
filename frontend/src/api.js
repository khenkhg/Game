export const playMove = async (column) => {
    const res = await fetch('https://connect-four-3lm8.onrender.com/play', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ column }),
    });
    return res.json();
  };
  
  export const aiMove = async () => {
    const res = await fetch('https://connect-four-3lm8.onrender.com/ai_move', { method: 'POST' });
    return res.json();
  };
  
  export const resetGame = async () => {
    const res = await fetch('https://connect-four-3lm8.onrender.com/reset', { method: 'POST' });
    return res.json();
  };
  
