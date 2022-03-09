import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.3:8000",
});

export default api;
