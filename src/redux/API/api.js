import axios from "axios";

const API = axios.create({

    baseURL: process.env.REACT_APP_API_URL ||'https://my-prsonal-web-site-server.vercel.app/',
})

export default API