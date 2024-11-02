import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  // baseURL: "https://yummy-server-five.vercel.app/api/v1",
});

export default instance;
