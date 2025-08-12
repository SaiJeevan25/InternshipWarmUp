import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/company' });

export const registerCompany = (data, token) => API.post('/register', data, { headers: { Authorization: `Bearer ${token}` } });
export const getProfile = (token) => API.get('/profile', { headers: { Authorization: `Bearer ${token}` } });
export const updateProfile = (data, token) => API.put('/profile', data, { headers: { Authorization: `Bearer ${token}` } });
export const uploadLogo = (file, token) => {
  const formData = new FormData();
  formData.append('file', file);
  return API.post('/upload-logo', formData, { headers: { Authorization: `Bearer ${token}` } });
};
export const uploadBanner = (file, token) => {
  const formData = new FormData();
  formData.append('file', file);
  return API.post('/upload-banner', formData, { headers: { Authorization: `Bearer ${token}` } });
};
