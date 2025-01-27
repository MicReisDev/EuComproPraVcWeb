import axios from "axios";

// const ENDPOINTS = {
//   CSRF_COOKIE: "/sanctum/csrf-cookie",
// };

const axiosInstance = axios.create({
  withCredentials: false,
  // withXSRFToken: true,
  // xsrfCookieName: "XSRF-TOKEN",
  // xsrfHeaderName: "X-XSRF-TOKEN",
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  return config;
});
export default axiosInstance;
