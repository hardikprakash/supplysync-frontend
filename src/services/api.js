import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export const updateGPSLocation = async (vehicleId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/gps/update`, { vehicle_id: vehicleId });
    return response.data;
  } catch (error) {
    console.error("Error updating GPS location:", error);
    throw error;
  }
};

export const fetchAlerts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/alerts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching alerts:", error);
    throw error;
  }
};
