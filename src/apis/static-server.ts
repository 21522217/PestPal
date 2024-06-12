import axios from "axios";

export const axiosClient = axios.create({
    baseURL: "https://pestpal-static-backend.onrender.com"
})