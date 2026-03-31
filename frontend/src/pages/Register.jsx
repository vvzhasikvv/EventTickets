import { useState } from "react";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import Alert from "../components/ui/Alert.jsx";
import Container from "../components/ui/Container.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const validate = () => {
    const errors = {};
    if (!form.name) errors.name = "Введите имя";
    if (!form.email) errors.email = "Введите email";
    if (!form.password || form.password.length < 6) {
      errors.password = "Пароль должен быть не менее 6 символов";
    }
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
      await register(form);
      setSuccess(true);
    } catch (err) {
      setError("Не удалось зарегистрироваться");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-section auth">
      <Container>
        <div className="auth__panel">
          <h2>Создайте аккаунт</h2>
          <p>Присоединяйтесь к Evently, чтобы бронировать билеты.</p>
          <form className="form" onSubmit={handleSubmit}>
            <Input
              label="Имя"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              aria-invalid={fieldErrors.name ? "true" : "false"}
              error={fieldErrors.name}
            />
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
              {loading ? "Создание..." : "Создать аккаунт"}
            </Button>
          </form>
          {error && <Alert type="error">{error}</Alert>}
          {success && <Alert type="success">Аккаунт создан. Теперь можно войти.</Alert>}
        </div>
      </Container>
    </section>
  );
};

export default Register;
