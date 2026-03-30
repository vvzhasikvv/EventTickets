const Input = ({ label, error, ...props }) => {
  return (
    <label className="input">
      <span>{label}</span>
      <input {...props} />
      {error && <span className="input__error">{error}</span>}
    </label>
  );
};

export default Input;
