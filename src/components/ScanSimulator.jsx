import React, { useState } from 'react';

function ScanSimulator({ itemId }) {
  const [message, setMessage] = useState("");

  const simulateScan = () => {
    fetch(`http://localhost:8000/api/scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item_id: itemId })
    })
    .then(response => response.json())
    .then(data => setMessage(data.message))
    .catch(error => console.error('Error simulating scan:', error));
  };

  return (
    <div>
      <button onClick={simulateScan}>Simulate Scan</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ScanSimulator;
