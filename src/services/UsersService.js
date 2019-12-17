import axios from 'axios'
const BASE_URL = `https://smart-road.herokuapp.com/api/users`;

export function registerUser(user) {
    return axios.post(`${BASE_URL}/register`, {
        email: user.email,
        password: user.password
    }).then(res => res.data);
}

export function login(user) {
    return axios.post(`${BASE_URL}/login`, {
        email: user.email,
        password: user.password
    }).then(res => res.data);
}
//res => res.data