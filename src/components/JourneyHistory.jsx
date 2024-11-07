import React, { useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function JourneyHistory({ vehicleId }) {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/gps/history?vehicle_id=${vehicleId}`)
            .then((response) => response.json())
            .then((data) => setHistory(data.journey_history))
            .catch((error) =>
                console.error("Error fetching journey history:", error)
            );
    }, [vehicleId]);

    if (!history.length)
        return (
            <p className="text-center text-gray-500 py-4">
                Loading journey history...
            </p>
        );

    const routeCoordinates = history.map((point) => [
        point.latitude,
        point.longitude,
    ]);

    return (
        <div className="journey-history-container bg-gray-100 p-6 rounded-lg shadow-md max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Journey History
            </h2>
            <MapContainer
                center={routeCoordinates[0]}
                zoom={13}
                style={{ height: "400px", width: "100%" }}
                className="rounded-lg shadow-sm"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Polyline positions={routeCoordinates} color="blue" />
                {history.map((point, index) => (
                    <Marker
                        key={index}
                        position={[point.latitude, point.longitude]}
                    >
                        <Popup>
                            <div className="text-center">
                                <span className="font-semibold">
                                    Checkpoint {index + 1}
                                </span>
                                <br />
                                <span className="text-gray-600">
                                    {new Date(point.timestamp).toLocaleString()}
                                </span>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default JourneyHistory;
