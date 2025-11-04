import api, { apiMultipart } from './axios';

export const getTiposTaller = async () => (await api.get('/tipos-taller/')).data;
export const getTipoTaller = async id => (await api.get(`/tipos-taller/${id}/`)).data;

// Puedes agregar create, update, delete al estilo de tallerService si lo necesitas
