import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { subscribe } from "../utils/notify.js";

const NotificationContext = createContext(null);

let counter = 0;

export const NotificationProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    return subscribe((payload) => {
      const id = `n_${counter++}`;
      setItems((prev) => [...prev, { id, ...payload }]);
      setTimeout(() => {
        setItems((prev) => prev.filter((item) => item.id !== id));
      }, 3500);
    });
  }, []);

  const value = useMemo(
    () => ({ items, remove: (id) => setItems((prev) => prev.filter((i) => i.id !== id)) }),
    [items]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
};
