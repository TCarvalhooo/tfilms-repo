import axios from 'axios'

const api = axios.create({
    baseURL: "https://tfilms-repo-backend.onrender.com"
})

export default api
