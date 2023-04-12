import axiosInstance from "../redux/axiosInstance";

export const productAsync = async () => {
  return await axiosInstance()
    .get("/user", {
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response.data;
    });
};
