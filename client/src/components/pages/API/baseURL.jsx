import axios from "axios";

const grievanceBaseUrl = axios.create({
  //baseURL: "http://192.168.30.40:90",
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

export default grievanceBaseUrl;
