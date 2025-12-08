import axios from 'axios';

// Ensure this matches your Backend URL
const API_URL = 'http://localhost:3000/api/stages';

export const getStages = async () => {
    return await axios.get(API_URL);
};

export const getStageById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
};

export const createStage = async (stageData) => {
    return await axios.post(API_URL, stageData);
};

export const updateStage = async (id, stageData) => {
    return await axios.put(`${API_URL}/${id}`, stageData);
};

export const deleteStage = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};