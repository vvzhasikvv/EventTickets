import { useState } from "react";
import { login } from "../services/eventService.js";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import Alert from "../components/ui/Alert.jsx";
import Container from "../components/ui/Container.jsx";

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
    <section className="page-section auth">
      <Container>
        <div className="auth__panel">
          <h2>Welcome back</h2>
          <p>Log in to manage bookings and discover events.</p>
          <form className="form" onSubmit={handleSubmit}>
            <Input
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <Button type="submit">Login</Button>
          </form>
          {error && <Alert type="error">{error}</Alert>}
          {success && <Alert type="success">Logged in successfully.</Alert>}
        </div>
      </Container>
    </section>
  );
};

export default Login;
