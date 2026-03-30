import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link className="navbar__brand" to="/">Event Ticketing</Link>
        <nav className="navbar__links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
