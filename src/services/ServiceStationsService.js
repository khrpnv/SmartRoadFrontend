import axios from 'axios'

const BASE_URL = `http://localhost:8080/api/service_stations`;

export function postServiceStation(serviceStation) {
    return axios.post(`${BASE_URL}`, {
        name: serviceStation.name,
        description: serviceStation.description,
        latitude: serviceStation.latitude,
        longtitude: serviceStation.longtitude,
        type: serviceStation.type
    }).then(res => res.data);
}

export function getNearestStations(lat, long, type) {
    return axios.get(`${BASE_URL}/nearest?lat=${lat}&long=${long}&type=${type}&range=5`).then(res => res.data);
}


