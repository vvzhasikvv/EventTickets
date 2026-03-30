import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "./ui/Button.jsx";
import Container from "./ui/Container.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="navbar">
      <Container className="navbar__inner">
        <Link className="navbar__brand" to="/">Evently</Link>

        <button
          className="navbar__toggle"
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`navbar__links ${open ? "navbar__links--open" : ""}`}>
          <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
          <NavLink to="/events" onClick={closeMenu}>Events</NavLink>
          {isAuthenticated && (
            <NavLink to="/bookings" onClick={closeMenu}>My bookings</NavLink>
          )}
        </nav>

        <div className={`navbar__actions ${open ? "navbar__actions--open" : ""}`}>
          {isAuthenticated ? (
            <>
              <span className="navbar__user">Hi, {user?.name || "User"}</span>
              <Button variant="secondary" size="sm" onClick={() => { logout(); closeMenu(); }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <NavLink className="navbar__link" to="/login" onClick={closeMenu}>Login</NavLink>
              <Button to="/register" variant="primary" size="sm" onClick={closeMenu}>Get started</Button>
            </>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
