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

export const get24SolidMoistures = () => API.get("api/data/daysoildmoistures");

export const get24SolidTemperatures = () => API.get("api/data/daytemperatures");

export const get24SolidHumidities = () => API.get("api/data/dayhumidities");
