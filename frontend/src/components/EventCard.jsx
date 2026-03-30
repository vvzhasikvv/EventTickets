import Card from "./ui/Card.jsx";
import Button from "./ui/Button.jsx";

const EventCard = ({ event, onClick }) => {
  return (
    <Card className="event-card" onClick={onClick} role={onClick ? "button" : undefined}>
      <div className="event-card__media">
        {event.coverImageUrl ? (
          <img src={event.coverImageUrl} alt={event.title} />
        ) : (
          <div className="event-card__placeholder" />
        )}
      </div>
      <div className="event-card__body">
        <div className="event-card__meta">
          <span>{event.location}</span>
          <span>{new Date(event.startDate).toLocaleDateString()}</span>
        </div>
        <h3>{event.title}</h3>
        <div className="event-card__footer">
          <span className="event-card__price">${event.price}</span>
          <Button variant="ghost" size="sm">Details</Button>
        </div>
      </div>
    </Card>
  );
};

export default EventCard;
