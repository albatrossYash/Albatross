import Axios from "axios";
const axiosInstance = () => {
  const headers = {};
  const axiosInstance = Axios.create({
    baseURL: "http://localhost:3031/",
    headers,
  });
  axiosInstance.interceptors.response.use(
    (response) => Promise.resolve(response),
    (error) => {
      console.log("Error Response " + error);
      switch (error.response.status) {
        case 401:
          console.log("Unauthorized access");
          break;
        case 403:
          console.log("Forbidden");
          break;
        case 500:
          console.log("Something went wrong in the server");
          break;
        default:
          break;
      }
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};
export default axiosInstance;