import { useState } from "react";
import { register } from "../services/eventService.js";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import Alert from "../components/ui/Alert.jsx";
import Container from "../components/ui/Container.jsx";

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
    <section className="page-section auth">
      <Container>
        <div className="auth__panel">
          <h2>Create your account</h2>
          <p>Join Evently to access exclusive event tickets.</p>
          <form className="form" onSubmit={handleSubmit}>
            <Input
              label="Name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
            />
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
            <Button type="submit">Create account</Button>
          </form>
          {error && <Alert type="error">{error}</Alert>}
          {success && <Alert type="success">Account created. You can log in now.</Alert>}
        </div>
      </Container>
    </section>
  );
};

export default Register;
