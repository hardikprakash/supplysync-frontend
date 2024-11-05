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

  if (!location) return <p>Loading vehicle location...</p>;

  return (
    <MapContainer center={[location.lat, location.lon]} zoom={13} style={{ height: "400px", width: "100%" }}>
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
  );
}

export default VehicleMap;
