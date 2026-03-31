const listeners = new Set();

export const notify = (payload) => {
  listeners.forEach((listener) => listener(payload));
};

export const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
