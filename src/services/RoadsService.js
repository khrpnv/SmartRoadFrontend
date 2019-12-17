import axios from 'axios'

const BASE_URL = `https://smart-road.herokuapp.com/api/roads`;

export function getAll() {
    return axios.get(`${BASE_URL}`).then(res => res.data);
}

export function getType(roadId) {
    return axios.get(`${BASE_URL}/${roadId}/state`).then(res => res.data)
}