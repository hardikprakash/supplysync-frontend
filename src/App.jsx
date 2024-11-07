import React from 'react';
import InventoryDashboard from './components/InventoryDashboard';
import VehicleMap from './components/VehicleMap';
import JourneyHistory from './components/JourneyHistory';
import AlertsPanel from './components/AlertsPanel';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">SupplySync Dashboard</h1>
        <p className="text-gray-600">Manage inventory, track vehicles, and view journey history and alerts.</p>
      </header>
      
      <main className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl">
        <section className="col-span-1 md:col-span-2 lg:col-span-1">
          <InventoryDashboard />
        </section>

        <section className="col-span-1">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Vehicle Tracking</h2>
          <VehicleMap vehicleId="vehicle_1" />
        </section>

        <section className="col-span-1 md:col-span-2">
          <JourneyHistory vehicleId="vehicle_1" />
        </section>

        <section className="col-span-1">
          <AlertsPanel />
        </section>
      </main>
    </div>
  );
}

export default App;
