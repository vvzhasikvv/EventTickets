import Card from "../components/ui/Card.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import Alert from "../components/ui/Alert.jsx";
import Container from "../components/ui/Container.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import useAsync from "../hooks/useAsync.js";
import { fetchMyBookings } from "../services/eventService.js";

const Bookings = () => {
  const { data: bookings, loading, error } = useAsync(fetchMyBookings, []);

  return (
    <section className="page-section">
      <Container>
        <div className="page-header">
          <div>
            <h2>My bookings</h2>
            <p>All your confirmed tickets in one place.</p>
          </div>
        </div>

        {loading && <Spinner />}
        {error && <Alert type="error">Failed to load bookings.</Alert>}

        {!loading && !error && bookings?.length === 0 && (
          <EmptyState
            title="No bookings yet"
            description="Once you book a ticket it will show up here."
          />
        )}

        {!loading && !error && bookings?.length > 0 && (
          <div className="grid">
            {bookings.map((booking) => (
              <Card key={booking._id} className="booking-card">
                <div className="booking-card__body">
                  <h3>{booking.eventId?.title || "Event"}</h3>
                  <p className="text-muted">
                    {booking.eventId?.location} · {new Date(booking.eventId?.startDate).toLocaleString()}
                  </p>
                  <div className="booking-card__meta">
                    <span>Tickets: {booking.quantity}</span>
                    <span>Total: ${booking.totalPrice}</span>
                  </div>
                  <span className={`status status--${booking.status}`}>{booking.status}</span>
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
