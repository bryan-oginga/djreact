import api from './api';

export const register = async (email, password) => {
  const response = await api.post('/auth/register/', { email, password });
  return response.data;
};

export const login = async (email, password) => {
  const response = await api.post('/auth/login/', { email, password });
  const data = response.data;

  // Store tokens
  localStorage.setItem('access', data.access);
  localStorage.setItem('refresh', data.refresh);

  return data;
};

export const getProfile = async () => {
  const response = await api.get('/auth/profile/');
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
};
