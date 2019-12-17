import axios from 'axios'
const BASE_URL = `https://smart-road.herokuapp.com/api`;

export const getAll = () => {
    return axios.get(`${BASE_URL}/service_types`).then(res => res.data);
};

export const getServices = (typeId) => {
    return axios.get(`${BASE_URL}/service_types/${typeId}/services`).then(res => res.data);
};