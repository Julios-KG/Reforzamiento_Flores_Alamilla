import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://www.delicias.somee.com',
});

export default apiClient