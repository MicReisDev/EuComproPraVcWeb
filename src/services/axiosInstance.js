import axios from "axios";

// const ENDPOINTS = {
//   CSRF_COOKIE: "/sanctum/csrf-cookie",
// };

const axiosInstance = axios.create({
  // withCredentials: true,
  // withXSRFToken: true,
  // xsrfCookieName: "XSRF-TOKEN",
  // xsrfHeaderName: "X-XSRF-TOKEN",
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
});

// axiosInstance.interceptors.request.use(async (config) => {
//   if (config.method !== "post") {
//     return config;
//   }
//   await axiosInstance.get(ENDPOINTS.CSRF_COOKIE);
//   return config;
// });
//
export default axiosInstance;
