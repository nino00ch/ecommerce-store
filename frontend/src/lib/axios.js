import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.mode === "development" ? "http://localhost:5000/api" : "/api", //dynamic
  withCredentials: true, // send cookies to the server ( auth.middleware.js )
});

export default axiosInstance;
