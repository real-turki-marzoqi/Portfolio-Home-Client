import axios from "axios";

const API = axios.create({

    baseURL:'https://personalwebsite-server.onrender.com/',
})

export default API