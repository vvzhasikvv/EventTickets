import api from "./api.js";

export const fetchEvents = async () => {
  const { data } = await api.get("/api/events");
  return data;
};

export const fetchEventById = async (id) => {
  const { data } = await api.get(`/api/events/${id}`);
  return data;
};

export const login = async (payload) => {
  const { data } = await api.post("/api/auth/login", payload);
  return data;
};

export const register = async (payload) => {
  const { data } = await api.post("/api/auth/register", payload);
  return data;
};
