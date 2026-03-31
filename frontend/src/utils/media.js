export const withApiBase = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const base = import.meta.env.VITE_API_URL || "http://localhost:4000";
  return `${base}${path}`;
};
