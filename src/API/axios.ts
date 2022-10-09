import axios from "axios";

const axiosOne = axios.create({
    baseURL: "http://localhost:4000",
});

export default axiosOne;