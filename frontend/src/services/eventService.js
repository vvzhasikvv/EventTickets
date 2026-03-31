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

export const createBooking = async (payload) => {
  const { data } = await api.post("/api/bookings", payload);
  return data;
};

export const fetchMyBookings = async () => {
  const { data } = await api.get("/api/bookings/my");
  return data;
};

export const createEvent = async (formData) => {
  const { data } = await api.post("/api/events", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return data;
};

export const updateEvent = async (id, formData) => {
  const { data } = await api.put(`/api/events/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return data;
};

export const deleteEvent = async (id) => {
  const { data } = await api.delete(`/api/events/${id}`);
  return data;
};
