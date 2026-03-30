import { useState } from "react";
import { register } from "../services/eventService.js";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
      await register(form);
      setSuccess(true);
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <section className="auth">
      <h2>Register</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Name
          <input name="name" type="text" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={handleChange} required />
        </label>
        <button className="button" type="submit">Create account</button>
        {error && <p className="form__error">{error}</p>}
        {success && <p className="form__success">Account created. You can log in now.</p>}
      </form>
    </section>
  );
};

export default Register;
