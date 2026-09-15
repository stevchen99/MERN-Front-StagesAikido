import axios from 'axios';

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

// Ajout du slash initial pour éviter toute erreur de concaténation
const STAGE_ENDPOINT = '/api/stages'; 

/**
 * @typedef {Object} StageData
 * @property {string} [date]
 * @property {string} address - Adresse complète (ex: "10 Rue de la Paix, 75002 Paris")
 * @property {string} [link] - Lien vers l'événement/stage
 * @property {string} stageName - Nom du stage
 * @property {number} cost - Tarif
 * @property {string} dept - Code département sur 2 caractères (ex: "75")
 */

export const getStages = async () => {
    return await axios.get(`${API_URL}${STAGE_ENDPOINT}`);
};

export const getStageById = async (id) => {
    return await axios.get(`${API_URL}${STAGE_ENDPOINT}/${id}`);
};

/**
 * @param {StageData} stageData
 */
export const createStage = async (stageData) => {
    return await axios.post(`${API_URL}${STAGE_ENDPOINT}`, stageData);
};

/**
 * @param {string} id
 * @param {StageData} stageData
 */
export const updateStage = async (id, stageData) => {
    return await axios.put(`${API_URL}${STAGE_ENDPOINT}/${id}`, stageData);
};

export const deleteStage = async (id) => {
    return await axios.delete(`${API_URL}${STAGE_ENDPOINT}/${id}`);
};