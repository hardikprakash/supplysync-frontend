// src/App.js
import React from 'react';
import InventoryDashboard from './components/InventoryDashboard';
import VehicleMap from './components/VehicleMap';

function App() {
  return (
    <div className="App">
      <InventoryDashboard />
      <h1>Vehicle Tracking</h1>
      <VehicleMap vehicleId="vehicle_1" />
    </div>
  );
}

export default App;
