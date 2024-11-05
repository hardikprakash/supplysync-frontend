import React, { useEffect, useState } from 'react';

function InventoryDashboard() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    // Fetch inventory data on component mount
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
    <div>
      <h2>Inventory Dashboard</h2>
      <ul>
        {inventory.map(item => (
          <li key={item.id}>
            {item.item_name} - Stock: {item.stock_level}
            <button onClick={() => updateStock(item.id, 1)}>Add Stock</button>
            <button onClick={() => updateStock(item.id, -1)}>Remove Stock</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InventoryDashboard;
