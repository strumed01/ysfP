import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('credix_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Auth ──────────────────────────────────────────────────────────────────────
export const register = (data) => API.post('/auth/register', data);
export const login    = (data) => API.post('/auth/login', data);

// ── Transactions ──────────────────────────────────────────────────────────────
export const getTransactions    = ()     => API.get('/transactions');
export const createTransaction  = (data) => API.post('/transactions', data);
export const deleteTransaction  = (id)   => API.delete(`/transactions/${id}`);

// ── Budgets ───────────────────────────────────────────────────────────────────
export const getBudgets   = ()     => API.get('/budgets');
export const updateBudget = (data) => API.put('/budgets', data);

// ── Goals ─────────────────────────────────────────────────────────────────────
export const getGoals    = ()     => API.get('/goals');
export const createGoal  = (data) => API.post('/goals', data);
export const deleteGoal  = (id)   => API.delete(`/goals/${id}`);

// ── Credit Score ──────────────────────────────────────────────────────────────
export const getCreditScore = () => API.get('/credit/score');

// ── User ──────────────────────────────────────────────────────────────────────
export const getProfile    = ()     => API.get('/users/profile');
export const updateProfile = (data) => API.put('/users/profile', data);

export default API;
