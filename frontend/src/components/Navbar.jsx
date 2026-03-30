import { Link, NavLink } from "react-router-dom";
import Button from "./ui/Button.jsx";
import Container from "./ui/Container.jsx";

const Navbar = () => {
  return (
    <header className="navbar">
      <Container className="navbar__inner">
        <Link className="navbar__brand" to="/">Evently</Link>
        <nav className="navbar__links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/events">Events</NavLink>
        </nav>
        <div className="navbar__actions">
          <NavLink className="navbar__link" to="/login">Login</NavLink>
          <Button to="/register" variant="primary" size="sm">Get started</Button>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
