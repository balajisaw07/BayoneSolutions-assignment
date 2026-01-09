// src/api/axiosInstance.js
import axios from 'axios';
import { getToken } from '../utils/auth';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com', // Default for data fetching
    timeout: 10000,
});

// Request interceptor to add the auth token to headers
api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle 401 Unauthenticated globally if needed
        if (error.response && error.response.status === 401) {
            console.warn('Unauthorized access - token invalid or expired');
            // Clear token so that the app knows the session is invalid
            // Since this is outside a React component, we can't easily use useNavigate,
            // but we can manipulate window.location for a hard redirect if desired.
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_token_expiry');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
