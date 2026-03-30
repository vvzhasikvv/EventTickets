import { Link } from "react-router-dom";
import Button from "../components/ui/Button.jsx";
import Container from "../components/ui/Container.jsx";

const Home = () => {
  return (
    <section className="hero">
      <Container className="hero__inner">
        <div className="hero__copy">
          <span className="tag">New season</span>
          <h1>Book standout events in minutes.</h1>
          <p>
            Discover curated experiences, reserve tickets instantly, and keep all your
            events organized in one place.
          </p>
          <div className="hero__actions">
            <Button to="/events">Browse events</Button>
          </div>
        </div>
        <div className="hero__panel">
          <div className="hero__card">
            <h3>Tonight at 8:00 PM</h3>
            <p>Design Leadership Summit</p>
            <div className="hero__meta">
              <span>Online</span>
              <span>$49</span>
            </div>
          </div>
          <div className="hero__stats">
            <div>
              <strong>240+</strong>
              <span>Events</span>
            </div>
            <div>
              <strong>18k</strong>
              <span>Tickets</span>
            </div>
            <div>
              <strong>4.8</strong>
              <span>Avg rating</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Home;
