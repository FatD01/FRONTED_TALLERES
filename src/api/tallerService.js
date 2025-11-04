import api, { apiMultipart } from './axios';

export const getTalleres = async () => (await api.get('/talleres/')).data;
export const getTaller = async id => (await api.get(`/talleres/${id}/`)).data;

export const createTaller = async data => {
  const formData = new FormData();
  Object.entries(data).forEach(([k, v]) => formData.append(k, v ?? ""));
  return (await apiMultipart.post('/talleres/', formData)).data;
};

export const updateTaller = async (id, data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([k, v]) => formData.append(k, v ?? ""));
  return (await apiMultipart.put(`/talleres/${id}/`, formData)).data;
};

export const deleteTaller = async id => await api.delete(`/talleres/${id}/`);
