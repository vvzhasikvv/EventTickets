import Button from "../components/ui/Button.jsx";
import Container from "../components/ui/Container.jsx";

const NotFound = () => {
  return (
    <section className="page-section">
      <Container>
        <h2>Страница не найдена</h2>
        <p className="text-muted">Запрашиваемая страница не существует.</p>
        <Button to="/events" variant="secondary">Смотреть события</Button>
      </Container>
    </section>
  );
};

export default NotFound;
