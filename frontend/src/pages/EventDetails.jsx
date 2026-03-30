import { useParams } from "react-router-dom";
import useAsync from "../hooks/useAsync.js";
import { fetchEventById } from "../services/eventService.js";

const EventDetails = () => {
  const { id } = useParams();
  const { data: event, loading, error } = useAsync(() => fetchEventById(id), [id]);

  if (loading) return <p>Loading event...</p>;
  if (error) return <p>Failed to load event.</p>;
  if (!event) return <p>Event not found.</p>;

  return (
    <section className="details">
      <div className="details__media">
        {event.coverImageUrl ? (
          <img src={event.coverImageUrl} alt={event.title} />
        ) : (
          <div className="details__placeholder" />
        )}
      </div>
      <div className="details__content">
        <h2>{event.title}</h2>
        <p>{event.description}</p>
        <ul className="details__list">
          <li>Location: {event.location}</li>
          <li>Starts: {new Date(event.startDate).toLocaleString()}</li>
          <li>Ends: {new Date(event.endDate).toLocaleString()}</li>
          <li>Price: ${event.price}</li>
          <li>Available: {event.availableTickets}</li>
        </ul>
        <button className="button" type="button">Book tickets</button>
      </div>
    </section>
  );
};

export default EventDetails;
