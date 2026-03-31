import { useState } from "react";
import { login as loginApi } from "../services/eventService.js";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import Alert from "../components/ui/Alert.jsx";
import Container from "../components/ui/Container.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const validate = () => {
    const errors = {};
    if (!form.email) errors.email = "Введите email";
    if (!form.password) errors.password = "Введите пароль";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);
    if (!validate()) return;

    setLoading(true);
    try {
      await login(form);
      setSuccess(true);
    } catch (err) {
      setError("Неверный email или пароль");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-section auth">
      <Container>
        <div className="auth__panel">
          <h2>С возвращением</h2>
          <p>Войдите, чтобы управлять бронированиями и находить события.</p>
          <form className="form" onSubmit={handleSubmit}>
            <Input
              label="Эл. почта"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              aria-invalid={fieldErrors.email ? "true" : "false"}
              error={fieldErrors.email}
            />
            <Input
              label="Пароль"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              aria-invalid={fieldErrors.password ? "true" : "false"}
              error={fieldErrors.password}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Входим..." : "Войти"}
            </Button>
          </form>
          {error && <Alert type="error">{error}</Alert>}
          {success && <Alert type="success">Вы успешно вошли.</Alert>}
        </div>
      </Container>
    </section>
  );
};

export default Login;
