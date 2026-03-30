import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import Container from "../components/ui/Container.jsx";
import useAsync from "../hooks/useAsync.js";
import { fetchEvents } from "../services/eventService.js";

const EventsList = () => {
  const navigate = useNavigate();
  const { data: events, loading, error } = useAsync(fetchEvents, []);

  return (
    <section className="page-section">
      <Container>
        <div className="page-header">
          <div>
            <h2>Upcoming events</h2>
            <p>Pick your next experience from our featured lineup.</p>
          </div>
        </div>

        {loading && <Spinner />}
        {error && <p className="text-muted">Failed to load events.</p>}

        {!loading && !error && events?.length === 0 && (
          <EmptyState
            title="No events yet"
            description="Once new events are published they will appear here."
          />
        )}

        {!loading && !error && events?.length > 0 && (
          <div className="grid">
            {events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onClick={() => navigate(`/events/${event._id}`)}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default EventsList;
