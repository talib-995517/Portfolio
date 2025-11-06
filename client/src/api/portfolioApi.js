
import axios from 'axios';



const DEFAULT_API_BASE = 'http://localhost:5001/api';
const apiBase = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE;

const api = axios.create({
	baseURL: apiBase,
});


api.interceptors.request.use(
  (config) => {
    
    const token = localStorage.getItem('token');
    if (token) {
      
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    
    return Promise.reject(error);
  }
);



export const createPortfolio = (portfolioData) => api.post('/portfolios', portfolioData);
export const getAllPublicPortfoliosApi = () => api.get('/portfolios/public'); 
export const getMyPortfolios = () => api.get('/portfolios/my/list'); 
export const getPortfolioById = (id) => api.get(`/portfolios/${id}`);
export const updatePortfolio = (id, portfolioData) => api.put(`/portfolios/${id}`, portfolioData);
export const deletePortfolio = (id) => api.delete(`/portfolios/${id}`);


export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (userData) => api.post('/auth/login', userData);