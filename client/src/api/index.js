import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).token
    }`;
  }

  return req;
});

export const loginUser = (dataForm) => API.post("/api/user/login", dataForm);

export const getTemperature = () => API.get("/api/data/lasttemperature");

export const getHumidity = () => API.get("/api/data/lasthumidity");

export const getSoildMoisture = () => API.get("/api/data/lastsoildmoisture");

export const setFan = (value) => API.post("/api/data/setfan", value);

export const setMode = (value) => API.post("api/data/setmode", value);

export const setPump = (value) => API.post("api/data/setpump", value);

export const setLight = (value) => API.post("api/data/setlight", value);

export const getFan = () => API.get("api/data/lastfan");

export const getMode = () => API.get("api/data/lastmode");

export const getPump = () => API.get("api/data/lastpump");

export const getLed = () => API.get("api/data/lastlight");

export const get24SolidMoistures = (date = new Date().toISOString()) => {
  const apiUrl = `api/data/daysoildmoistures?date=${date}`;
  return API.get(apiUrl);
};

export const get24SolidTemperatures = (date = new Date().toISOString()) => {
  const apiUrl = `api/data/daytemperatures?date=${date}`;
  return API.get(apiUrl);
};

export const get24SolidHumidities = (date = new Date().toISOString()) => {
  const apiUrl = `api/data/dayhumidities?date=${date}`;
  return API.get(apiUrl);
};

export const getNotification = () => API.get("api/data/notifications");

export const getHightSolidMoisture = () =>
  API.get("api/data/high-soild-moisture");

export const getLowSolidMoisture = () => API.get("api/data/low-soild-moisture");

export const getRangeSolidMoisture = () =>
  API.get("api/data/soild-moisture-range");

export const postRangeSolidMoisture = (data) =>
  API.post("api/data/soild-moisture-range", data);

export const getPlantStatus = (limit = 10) =>
  API.get(`http://localhost:5000/api/data/plants-status?limit=${limit}`);
