import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000' })

API.interceptors.request.use((req) => {
    if (localStorage.getItem('user')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`;
    }

    return req;
})

export const loginUser = (dataForm) => API.post('/api/user/login', dataForm)

export const getTemperature = () => API.get('/api/data/lasttemperature')

export const getHumidity = () => API.get('/api/data/lasthumidity')

export const getSoildMoisture = () => API.get('/api/data/lastsoildmoisture')