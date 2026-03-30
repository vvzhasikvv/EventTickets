import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard.jsx";
import useAsync from "../hooks/useAsync.js";
import { fetchEvents } from "../services/eventService.js";

const EventsList = () => {
  const navigate = useNavigate();
  const { data: events, loading, error } = useAsync(fetchEvents, []);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Failed to load events.</p>;

  return (
    <section>
      <h2>Upcoming events</h2>
      <div className="grid">
        {events.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            onClick={() => navigate(`/events/${event._id}`)}
          />
        ))}
      </div>
    </section>
  );
};

export default EventsList;
