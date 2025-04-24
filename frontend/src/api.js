export const playMove = async (column) => {
    const res = await fetch('http://127.0.0.1:5000/play', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ column }),
    });
    return res.json();
  };
  
  export const aiMove = async () => {
    const res = await fetch('http://127.0.0.1:5000/ai_move', { method: 'POST' });
    return res.json();
  };
  
  export const resetGame = async () => {
    const res = await fetch('http://127.0.0.1:5000/reset', { method: 'POST' });
    return res.json();
  };
  