import axios from 'axios';

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

// Define the endpoint name here (check your Swagger if it's '/stages' or '/api/stages')
const STAGE_ENDPOINT = 'api/stages'; 

export const getStages = async () => {
    // Results in https://...app/stages
    return await axios.get(`${API_URL}${STAGE_ENDPOINT}`);
};

export const getStageById = async (id) => {
    return await axios.get(`${API_URL}${STAGE_ENDPOINT}/${id}`);
};

export const createStage = async (stageData) => {
    return await axios.post(`${API_URL}${STAGE_ENDPOINT}`, stageData);
};

export const updateStage = async (id, stageData) => {
    return await axios.put(`${API_URL}${STAGE_ENDPOINT}/${id}`, stageData);
};

export const deleteStage = async (id) => {
    return await axios.delete(`${API_URL}${STAGE_ENDPOINT}/${id}`);
};