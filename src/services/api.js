import axios from 'axios';

// Automatically removes trailing slashes if VITE_REACT_APP_API_URL ends with '/'
const rawUrl = import.meta.env.VITE_REACT_APP_API_URL || '';
const API_URL = rawUrl.replace(/\/+$/, '');

const STAGE_ENDPOINT = '/api/stages';

export const getStages = async () => {
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