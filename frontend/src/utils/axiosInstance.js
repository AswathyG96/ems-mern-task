// api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/v1", 
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
   
    const token = localStorage.getItem("token");
    if (token) {
      // Check if the token is expired
      const tokenExpiration = JSON.parse(localStorage.getItem("tokenExpiration"));
      if (tokenExpiration && new Date(tokenExpiration) < new Date()) {
        console.log("Token is expired. Redirecting to login page...");
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
        // Redirect to login page
        window.location.href = "/login";
      } else {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
     
    }
    else{
        window.location.href = "/login";
      }
    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error,'+++++++++++++');
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Do something with successful response
    return response;
  },
  (error) => {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
