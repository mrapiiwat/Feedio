export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getFeeder = () => `${API_BASE_URL}/feeder/1`;
export const getHistory = () => `${API_BASE_URL}/history`;
export const getDog = () => `${API_BASE_URL}/dog`;
export const getDogById = (id: number) => `${API_BASE_URL}/dog/${id}`;