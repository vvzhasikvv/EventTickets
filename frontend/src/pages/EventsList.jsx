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
          <h2>Ближайшие события</h2>
          <p>Выберите следующее событие из нашей подборки.</p>
        </div>
      </div>

        {loading && <Spinner />}
        {error && <p className="text-muted">Не удалось загрузить события.</p>}

        {!loading && !error && events?.length === 0 && (
          <EmptyState
            title="Пока нет событий"
            description="Когда появятся новые события, они будут здесь."
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
