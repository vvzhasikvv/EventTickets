import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAsync from "../hooks/useAsync.js";
import { fetchEventById, createBooking, fetchMyBookings } from "../services/eventService.js";
import Button from "../components/ui/Button.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import Container from "../components/ui/Container.jsx";
import Alert from "../components/ui/Alert.jsx";
import { useAuth } from "../context/AuthContext.jsx";

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
      setMessage("Ticket booked successfully.");
    } catch (err) {
      const status = err?.response?.status;
      if (status === 409) {
        setErrorMsg("You have already booked this event.");
      } else if (status === 401) {
        setErrorMsg("Please log in to book a ticket.");
      } else {
        setErrorMsg("Booking failed. Please try again.");
      }
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-muted">Failed to load event.</p>;
  if (!event) return <p className="text-muted">Event not found.</p>;

  return (
    <section className="page-section">
      <Container className="details">
        <div className="details__media">
          {event.coverImageUrl ? (
            <img src={event.coverImageUrl} alt={event.title} />
          ) : (
            <div className="details__placeholder" />
          )}
        </div>
        <div className="details__content">
          <span className="tag">{event.category}</span>
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <ul className="details__list">
            <li>Location: {event.location}</li>
            <li>Starts: {new Date(event.startDate).toLocaleString()}</li>
            <li>Ends: {new Date(event.endDate).toLocaleString()}</li>
            <li>Price: ${event.price}</li>
            <li>Available: {event.availableTickets}</li>
          </ul>
          <div className="details__actions">
            <Button
              onClick={handleBooking}
              disabled={actionLoading || alreadyBooked || !isAuthenticated || bookingsLoading}
            >
              {alreadyBooked ? "Already booked" : actionLoading ? "Booking..." : "Book ticket"}
            </Button>
            <Button variant="secondary">Share</Button>
          </div>
          {message && <Alert type="success">{message}</Alert>}
          {errorMsg && <Alert type="error">{errorMsg}</Alert>}
          {!isAuthenticated && (
            <Alert type="error">Log in to book a ticket.</Alert>
          )}
        </div>
      </Container>
    </section>
  );
};

export default EventDetails;
