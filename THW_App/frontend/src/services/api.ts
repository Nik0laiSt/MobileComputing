import axios from 'axios';

export const apiUrl: string = 'http://162.55.214.84:5000/api';

export const setAuthToken = (token: string) => {
  localStorage.setItem('jwtToken', token);
}
export const getAuthToken = () => {
  return localStorage.getItem('jwtToken'); 
};

export const getAuth = (): string => {
  return `Bearer ${getAuthToken()}`
}

const api = axios.create({
  baseURL: apiUrl,
  headers: {
      'Content-Type': 'application/json',
  },
});

// Request-Interceptor hinzufügen
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken(); // Hol das Token

    // Wenn ein Token vorhanden ist, füge es in die Header ein
    if (token) {
      config.headers['Authorization'] = getAuth();
      config.withCredentials;
    }

    return config; // Rückgabe der modifizierten Konfiguration
  },
  (error) => {
    // Fehlerbehandlung (optional)
    return Promise.reject(error);
  }
);

export default api;
