import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="hero">
      <div className="hero__content">
        <h1>Find and book your next event</h1>
        <p>Discover curated events and book tickets in seconds.</p>
        <Link className="button" to="/events">Browse events</Link>
      </div>
    </section>
  );
};

export default Home;
