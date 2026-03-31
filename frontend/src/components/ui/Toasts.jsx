import { useNotifications } from "../../context/NotificationContext.jsx";

const Toasts = () => {
  const { items, remove } = useNotifications();

  return (
    <div className="toasts" aria-live="polite">
      {items.map((toast) => (
        <button
          key={toast.id}
          type="button"
          className={`toast toast--${toast.type || "info"}`}
          onClick={() => remove(toast.id)}
        >
          <strong>{toast.title}</strong>
          {toast.message && <span>{toast.message}</span>}
        </button>
      ))}
    </div>
  );
};

export default Toasts;
