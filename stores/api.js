import axios from "axios";

// export const baseURL = "http://192.168.100.120:8000"; //taher
// export const baseURL = "http://192.168.150.90:8000"; //aziz
export const baseURL = "http://192.168.100.120:8000"; //Taher
// export const baseURL = "http://localhost:8000"

const api = axios.create({ baseURL: `${baseURL}/api` });

export default api;
