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
    <div className="bg-white p-4 rounded-lg shadow-md max-w-sm mx-auto text-center">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Scan Simulator</h2>
      <button 
        onClick={simulateScan}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mb-4"
      >
        Simulate Scan
      </button>
      {message && <p className="text-green-600 font-medium">{message}</p>}
    </div>
  );
}

export default ScanSimulator;
