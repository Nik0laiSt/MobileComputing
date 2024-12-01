import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Token aus dem lokalen Speicher oder einer anderen Quelle holen
const getAuthToken = () => {
    return localStorage.getItem('jwtToken'); // Zum Beispiel aus localStorage
  };


// Request-Interceptor hinzufügen
api.interceptors.request.use(
    (config) => {
      const token = getAuthToken(); // Hol das Token
  
      // Wenn ein Token vorhanden ist, füge es in die Header ein
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
  
      return config; // Rückgabe der modifizierten Konfiguration
    },
    (error) => {
      // Fehlerbehandlung (optional)
      return Promise.reject(error);
    }
  );

export default api;
