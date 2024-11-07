import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function VehicleMap({ vehicleId }) {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocation = () => {
      fetch(`http://localhost:8000/gps/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vehicle_id: vehicleId })
      })
        .then(response => response.json())
        .then(data => setLocation(data.location))
        .catch(error => console.error("Error fetching location:", error));
    };

    const intervalId = setInterval(fetchLocation, 5000);
    return () => clearInterval(intervalId);
  }, [vehicleId]);

  if (!location) return <p className="text-center text-gray-600">Loading vehicle location...</p>;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-2xl mx-auto mt-4">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Vehicle Map</h2>
      <MapContainer
        center={[location.lat, location.lon]}
        zoom={13}
        className="h-96 w-full rounded-lg overflow-hidden"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[location.lat, location.lon]}>
          <Popup>
            Vehicle {vehicleId} is here.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default VehicleMap;
