import axios from "axios"

const API = axios.create({
    baseURL: "https://authforge-7por.onrender.com/api"
})

export default API