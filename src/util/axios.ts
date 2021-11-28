import axios, { Axios } from "axios";
require('dotenv').config()

const api = axios.create({
  baseURL: process.env.EXCHANGE_RATE_BASE_URL,
})

export default api