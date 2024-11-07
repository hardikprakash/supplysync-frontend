import React, { useEffect, useState } from 'react';

function InventoryDashboard() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/inventory')
      .then(response => response.json())
      .then(data => setInventory(data))
      .catch(error => console.error('Error fetching inventory:', error));
  }, []);

  const updateStock = (itemId, quantity) => {
    fetch('http://localhost:8000/api/inventory/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item_id: itemId, quantity: quantity })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      setInventory(inventory.map(item => 
        item.id === itemId ? { ...item, stock_level: item.stock_level + quantity } : item
      ));
    })
    .catch(error => console.error('Error updating stock:', error));
  };

  return (
    <div className="inventory-dashboard bg-gray-100 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Inventory Dashboard</h2>
      <ul className="space-y-4">
        {inventory.map(item => (
          <li key={item.id} className="p-4 bg-white rounded-lg shadow-sm flex items-center justify-between">
            <div>
              <span className="font-semibold text-gray-700">{item.item_name}</span> - 
              <span className="ml-2 text-gray-600">Stock: {item.stock_level}</span>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => updateStock(item.id, 1)}
                className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Add Stock
              </button>
              <button
                onClick={() => updateStock(item.id, -1)}
                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Remove Stock
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InventoryDashboard;
