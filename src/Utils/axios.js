import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
   baseURL: "https://javadinstagram.pythonanywhere.com",
   headers: {
      "Content-Type": "application/json",
   },
});

// axios.defaults.headers.post["Content-Type"] = "application/json";

// axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get("access")}`;

// axiosInstance.interceptors.response.use(
//    (response) => response,
//    (error) => Promise.reject((error.response && error.response.data) || "Something went wrong")
// );

export default axiosInstance;
