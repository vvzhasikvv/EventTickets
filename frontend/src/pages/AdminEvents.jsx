import { useEffect, useMemo, useState } from "react";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import Alert from "../components/ui/Alert.jsx";
import Card from "../components/ui/Card.jsx";
import Container from "../components/ui/Container.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import { withApiBase } from "../utils/media.js";
import {
  fetchEvents,
  createEvent,
  updateEvent,
  deleteEvent
} from "../services/eventService.js";

const emptyForm = {
  title: "",
  description: "",
  location: "",
  startDate: "",
  endDate: "",
  capacity: "",
  price: "",
  category: "",
  status: "published"
};

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchEvents();
      setEvents(data);
    } catch {
      setError("Не удалось загрузить события");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setImage(null);
    setEditingId(null);
    setFieldErrors({});
  };

  const validate = () => {
    const errors = {};
    if (!form.title) errors.title = "Введите название";
    if (!form.description) errors.description = "Введите описание";
    if (!form.location) errors.location = "Введите локацию";
    if (!form.startDate) errors.startDate = "Укажите дату начала";
    if (!form.endDate) errors.endDate = "Укажите дату окончания";
    if (!form.capacity) errors.capacity = "Укажите вместимость";
    if (!form.price) errors.price = "Укажите цену";
    if (!form.category) errors.category = "Укажите категорию";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    if (!validate()) return;

    setSaving(true);
    try {
      const payload = new FormData();
      Object.entries(form).forEach(([key, value]) => payload.append(key, value));
      if (image) payload.append("image", image);

      if (editingId) {
        await updateEvent(editingId, payload);
        setSuccess("Событие успешно обновлено.");
      } else {
        await createEvent(payload);
        setSuccess("Событие успешно создано.");
      }
      resetForm();
      await load();
    } catch (err) {
      setError("Не удалось сохранить событие");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (evt) => {
    setEditingId(evt._id);
    setForm({
      title: evt.title || "",
      description: evt.description || "",
      location: evt.location || "",
      startDate: evt.startDate ? evt.startDate.slice(0, 16) : "",
      endDate: evt.endDate ? evt.endDate.slice(0, 16) : "",
      capacity: evt.capacity?.toString() || "",
      price: evt.price?.toString() || "",
      category: evt.category || "",
      status: evt.status || "published"
    });
    setImage(null);
  };

  const handleDelete = async (id) => {
    setError(null);
    setSuccess(null);
    try {
      await deleteEvent(id);
      setSuccess("Событие удалено.");
      await load();
    } catch {
      setError("Не удалось удалить событие");
    }
  };

  const submitLabel = useMemo(() => {
    if (saving) return editingId ? "Сохраняем..." : "Создаём...";
    return editingId ? "Сохранить" : "Создать событие";
  }, [saving, editingId]);

  return (
    <section className="page-section">
      <Container>
        <div className="page-header">
          <div>
            <h2>Админ‑панель</h2>
            <p>Управляйте событиями, билетами и изображениями.</p>
          </div>
        </div>

        <Card className="admin-form">
          <h3>{editingId ? "Редактировать событие" : "Создать событие"}</h3>
          <form className="form" onSubmit={handleSubmit}>
            <Input
              label="Название"
              name="title"
              value={form.title}
              onChange={handleChange}
              error={fieldErrors.title}
            />
            <Input
              label="Описание"
              name="description"
              value={form.description}
              onChange={handleChange}
              error={fieldErrors.description}
            />
            <Input
              label="Локация"
              name="location"
              value={form.location}
              onChange={handleChange}
              error={fieldErrors.location}
            />
            <div className="form__row">
              <Input
                label="Начало"
                name="startDate"
                type="datetime-local"
                value={form.startDate}
                onChange={handleChange}
                error={fieldErrors.startDate}
              />
              <Input
                label="Окончание"
                name="endDate"
                type="datetime-local"
                value={form.endDate}
                onChange={handleChange}
                error={fieldErrors.endDate}
              />
            </div>
            <div className="form__row">
              <Input
                label="Вместимость"
                name="capacity"
                type="number"
                value={form.capacity}
                onChange={handleChange}
                error={fieldErrors.capacity}
              />
              <Input
                label="Цена (₸)"
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                error={fieldErrors.price}
              />
            </div>
            <div className="form__row">
              <Input
                label="Категория"
                name="category"
                value={form.category}
                onChange={handleChange}
                error={fieldErrors.category}
              />
              <label className="input">
                <span>Статус</span>
                <select name="status" value={form.status} onChange={handleChange}>
                  <option value="published">Опубликовано</option>
                  <option value="draft">Черновик</option>
                  <option value="cancelled">Отменено</option>
                </select>
              </label>
            </div>
            <label className="input">
              <span>Изображение</span>
              <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
            </label>
            <div className="form__actions">
              <Button type="submit" disabled={saving}>{submitLabel}</Button>
              {editingId && (
                <Button type="button" variant="secondary" onClick={resetForm}>
                  Отмена
                </Button>
              )}
            </div>
          </form>
          {error && <Alert type="error">{error}</Alert>}
          {success && <Alert type="success">{success}</Alert>}
        </Card>

        <div className="admin-list">
          <h3>Все события</h3>
          {loading && <Spinner />}
          {!loading && events.length === 0 && (
            <p className="text-muted">Событий не найдено.</p>
          )}
          <div className="grid">
            {events.map((evt) => (
              <Card key={evt._id} className="admin-card">
                {evt.coverImageUrl ? (
                  <img src={withApiBase(evt.coverImageUrl)} alt={evt.title} />
                ) : (
                  <div className="admin-card__placeholder" />
                )}
                <div className="admin-card__body">
                  <h4>{evt.title}</h4>
                  <p className="text-muted">{evt.location}</p>
                  <div className="admin-card__actions">
                    <Button size="sm" variant="secondary" onClick={() => handleEdit(evt)}>Редактировать</Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDelete(evt._id)}>Удалить</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AdminEvents;
