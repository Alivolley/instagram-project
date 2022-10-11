import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
   baseURL: "https://javadinstagram.pythonanywhere.com",
   headers: {
      "Content-Type": "application/json",
   },
});

// axiosInstance.interceptors.response.use(
//    (response) => response,
//    (error) => Promise.reject((error.response && error.response.data) || "Something went wrong")
// );

export default axiosInstance;
