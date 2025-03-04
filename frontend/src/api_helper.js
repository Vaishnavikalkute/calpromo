import axios from "axios";

const API_URL = "http://localhost:5000";

export const saveData = async (eventData) => {
  try {
    const formattedEvent = {
      title: eventData.title,
      start: new Date(eventData.start), // Convert to ISO 8601
      end: new Date(eventData.end)
    };
    const response = await axios.post(`${API_URL}/save`, formattedEvent);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getData = async () => {
  try {

    const response = await axios.get(`${API_URL}/data`);


    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateData = async (id, newData) => {
  try {
    const response = await axios.put(`${API_URL}/update/${id}`, newData);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteData = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
