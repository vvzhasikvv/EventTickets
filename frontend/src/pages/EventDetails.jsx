import { useParams } from "react-router-dom";
import useAsync from "../hooks/useAsync.js";
import { fetchEventById } from "../services/eventService.js";
import Button from "../components/ui/Button.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import Container from "../components/ui/Container.jsx";

const EventDetails = () => {
  const { id } = useParams();
  const { data: event, loading, error } = useAsync(() => fetchEventById(id), [id]);

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
            <Button>Book tickets</Button>
            <Button variant="secondary">Share</Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default EventDetails;
