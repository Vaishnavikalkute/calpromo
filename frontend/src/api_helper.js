import axios from "axios";

const API_URL = "http://localhost:5000";

export const saveData = async (data) => {
  try {
    console.log("iamdatd",data)
    const response = await axios.post(`${API_URL}/save`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getData = async () => {
  try {
    console.log("I WORK")
    const response = await axios.get(`${API_URL}/data`);
    console.log(response)

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
