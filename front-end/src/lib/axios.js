import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://ubiquitous-pancake-pj9r56wqj4gxh6pqg-8000.app.github.dev/api',
    withCredentials: true,
});