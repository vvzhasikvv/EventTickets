import Card from "../components/ui/Card.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import Alert from "../components/ui/Alert.jsx";
import Container from "../components/ui/Container.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import useAsync from "../hooks/useAsync.js";
import { fetchMyBookings } from "../services/eventService.js";

const Bookings = () => {
  const { data: bookings, loading, error } = useAsync(fetchMyBookings, []);

  const statusLabels = {
    confirmed: "подтверждено",
    pending: "в ожидании",
    cancelled: "отменено"
  };

  return (
    <section className="page-section">
      <Container>
        <div className="page-header">
          <div>
            <h2>Мои брони</h2>
            <p>Все ваши билеты в одном месте.</p>
          </div>
        </div>

        {loading && <Spinner />}
        {error && <Alert type="error">Не удалось загрузить бронирования.</Alert>}

        {!loading && !error && bookings?.length === 0 && (
          <EmptyState
            title="Пока нет бронирований"
            description="Когда вы забронируете билет, он появится здесь."
          />
        )}

        {!loading && !error && bookings?.length > 0 && (
          <div className="grid">
            {bookings.map((booking) => (
              <Card key={booking._id} className="booking-card">
                <div className="booking-card__body">
                  <h3>{booking.eventId?.title || "Событие"}</h3>
                  <p className="text-muted">
                    {booking.eventId?.location} · {new Date(booking.eventId?.startDate).toLocaleString()}
                  </p>
                  <div className="booking-card__meta">
                    <span>Билеты: {booking.quantity}</span>
                    <span>Итого: {booking.totalPrice} ₸</span>
                  </div>
                  <span className={`status status--${booking.status}`}>
                    {statusLabels[booking.status] || booking.status}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default Bookings;
