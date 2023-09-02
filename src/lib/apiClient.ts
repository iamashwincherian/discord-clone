import axios, { AxiosInstance } from "axios";

const ApiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  // timeout: 1000 * 5,
});

export default ApiClient;
