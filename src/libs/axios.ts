import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

axiosClient.defaults.headers.common["Content-Type"] =
  "application/x-www-form-urlencoded";
axiosClient.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
