export const logger = {
  info: (msg) => console.log(`[info] ${msg}`),
  warn: (msg) => console.warn(`[warn] ${msg}`),
  error: (msg, err) => {
    console.error(`[error] ${msg}`);
    if (err) console.error(err);
  }
};
