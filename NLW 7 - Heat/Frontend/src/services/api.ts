import axios from "axios";
const url = import.meta.env.VITE_PRODUTION_URL;
const api = axios.create({
	baseURL: typeof url === "string" ? url : "https://do-while.herokuapp.com/",
});

export { api };
