import { useState } from "react";
import { login } from "../services/eventService.js";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      await login(form);
      setSuccess(true);
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <section className="auth">
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={handleChange} required />
        </label>
        <button className="button" type="submit">Login</button>
        {error && <p className="form__error">{error}</p>}
        {success && <p className="form__success">Logged in successfully.</p>}
      </form>
    </section>
  );
};

export default Login;
