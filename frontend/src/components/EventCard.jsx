const EventCard = ({ event, onClick }) => {
  return (
    <div className="card" onClick={onClick} role="button" tabIndex={0}>
      {event.coverImageUrl ? (
        <img className="card__image" src={event.coverImageUrl} alt={event.title} />
      ) : (
        <div className="card__image placeholder" />
      )}
      <div className="card__body">
        <h3 className="card__title">{event.title}</h3>
        <p className="card__meta">{event.location}</p>
        <p className="card__meta">{new Date(event.startDate).toLocaleString()}</p>
        <p className="card__price">${event.price}</p>
      </div>
    </div>
  );
};

export default EventCard;
