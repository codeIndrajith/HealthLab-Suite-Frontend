import axios from "axios";

const BASE_URL = "http://localhost:4000";
// const BASE_URL="https://devapi.novestrahealth.com";

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
