import axios from 'axios';

// Defaults to relative path '/api', which Vite proxies to http://localhost:5000/api
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000,
});

// Automatic token attachment interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('spheronix_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// System Health Check API
export const getHealthCheck = async () => {
  const response = await api.get('/health');
  return response.data;
};

// Flagship Domains API
export const getDomains = async () => {
  const response = await api.get('/domains');
  return response.data;
};

// Student Internship Applications API
export const getApplications = async (params = {}) => {
  const response = await api.get('/applications', { params });
  return response.data;
};

export const getApplicationStats = async () => {
  const response = await api.get('/applications/stats');
  return response.data;
};

export const getApplicationById = async (id) => {
  const response = await api.get(`/applications/${id}`);
  return response.data;
};

export const lookupApplication = async (identifier) => {
  const response = await api.get(`/applications/lookup/${encodeURIComponent(identifier)}`);
  return response.data;
};

export const submitApplication = async (applicationData) => {
  const response = await api.post('/applications', applicationData);
  return response.data;
};

export const deleteApplication = async (id) => {
  const response = await api.delete(`/applications/${id}`);
  return response.data;
};

export const updateApplicationStatus = async (id, status) => {
  const response = await api.patch(`/applications/${id}/status`, { status });
  return response.data;
};

// Student Authentication API
export const registerStudent = async (userData) => {
  const response = await api.post('/auth/register', userData);
  if (response.data?.token) {
    localStorage.setItem('spheronix_token', response.data.token);
  }
  return response.data;
};

export const loginStudent = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  if (response.data?.token) {
    localStorage.setItem('spheronix_token', response.data.token);
  }
  return response.data;
};

export const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

export const logoutStudent = () => {
  localStorage.removeItem('spheronix_token');
  localStorage.removeItem('spheronix_user');
};

// Corporate Inquiry API
export const submitInquiry = async (inquiryData) => {
  const response = await api.post('/inquiries', inquiryData);
  return response.data;
};

// WhatsApp Integration API
export const getWhatsAppConfig = async () => {
  const response = await api.get('/whatsapp/config');
  return response.data;
};

export const submitWhatsAppInquiry = async (inquiryData) => {
  const response = await api.post('/whatsapp/inquiry', inquiryData);
  return response.data;
};

export default api;
