import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAsync from "../hooks/useAsync.js";
import { fetchEventById, createBooking, fetchMyBookings } from "../services/eventService.js";
import Button from "../components/ui/Button.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import Container from "../components/ui/Container.jsx";
import Alert from "../components/ui/Alert.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { withApiBase } from "../utils/media.js";

const EventDetails = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const { data: event, loading, error } = useAsync(() => fetchEventById(id), [id]);
  const { data: bookings, loading: bookingsLoading } = useAsync(fetchMyBookings, []);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const alreadyBooked = bookings?.some((booking) => booking.eventId?._id === id);

  useEffect(() => {
    setMessage(null);
    setErrorMsg(null);
  }, [id]);

  const handleBooking = async () => {
    setActionLoading(true);
    setMessage(null);
    setErrorMsg(null);
    try {
      await createBooking({ eventId: id, quantity: 1 });
      setMessage("Билет успешно забронирован.");
    } catch (err) {
      const status = err?.response?.status;
      if (status === 409) {
        setErrorMsg("Вы уже бронировали это событие.");
      } else if (status === 401) {
        setErrorMsg("Войдите, чтобы забронировать билет.");
      } else {
        setErrorMsg("Не удалось забронировать. Попробуйте снова.");
      }
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-muted">Не удалось загрузить событие.</p>;
  if (!event) return <p className="text-muted">Событие не найдено.</p>;

  const imageUrl = event.coverImageUrl ? withApiBase(event.coverImageUrl) : null;

  return (
    <section className="page-section">
      <Container className="details">
        <div className="details__media">
          {imageUrl ? (
            <img src={imageUrl} alt={event.title} />
          ) : (
            <div className="details__placeholder" />
          )}
        </div>
        <div className="details__content">
          <span className="tag">{event.category}</span>
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <ul className="details__list">
            <li>Локация: {event.location}</li>
            <li>Начало: {new Date(event.startDate).toLocaleString()}</li>
            <li>Окончание: {new Date(event.endDate).toLocaleString()}</li>
            <li>Цена: {event.price} ₸</li>
            <li>Доступно: {event.availableTickets}</li>
          </ul>
          <div className="details__actions">
            <Button
              onClick={handleBooking}
              disabled={actionLoading || alreadyBooked || !isAuthenticated || bookingsLoading}
            >
              {alreadyBooked ? "Уже забронировано" : actionLoading ? "Бронируем..." : "Забронировать билет"}
            </Button>
            <Button variant="secondary">Поделиться</Button>
          </div>
          {message && <Alert type="success">{message}</Alert>}
          {errorMsg && <Alert type="error">{errorMsg}</Alert>}
          {!isAuthenticated && (
            <Alert type="error">Войдите, чтобы забронировать билет.</Alert>
          )}
        </div>
      </Container>
    </section>
  );
};

export default EventDetails;
