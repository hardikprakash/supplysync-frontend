import React, { useEffect, useState } from "react";
import { fetchAlerts } from "../services/api";

const AlertsPanel = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await fetchAlerts();
        setAlerts(data);
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="alerts-panel bg-red-100 p-4 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold text-red-600 mb-4">Active Alerts</h2>
      <ul className="space-y-2">
        {alerts.map((alert) => (
          <li
            key={alert.id}
            className="p-3 bg-white rounded-lg shadow-sm border-l-4 border-red-600"
          >
            <strong className="font-semibold text-red-600">{alert.alert_type}:</strong>{" "}
            <span className="text-gray-700">{alert.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertsPanel;
