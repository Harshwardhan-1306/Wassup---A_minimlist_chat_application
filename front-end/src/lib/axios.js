import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === 'development' ? 'https://ubiquitous-pancake-pj9r56wqj4gxh6pqg-8000.app.github.dev/api':'/api',
    withCredentials: true,
});