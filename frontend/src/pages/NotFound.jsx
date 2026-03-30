import Button from "../components/ui/Button.jsx";
import Container from "../components/ui/Container.jsx";

const NotFound = () => {
  return (
    <section className="page-section">
      <Container>
        <h2>Page not found</h2>
        <p className="text-muted">The page you are looking for does not exist.</p>
        <Button to="/events" variant="secondary">Browse events</Button>
      </Container>
    </section>
  );
};

export default NotFound;
