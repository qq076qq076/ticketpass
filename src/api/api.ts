import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_PATH, // 基础 URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;