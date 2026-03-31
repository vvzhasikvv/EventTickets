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
          aria-label="Открыть меню"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`navbar__links ${open ? "navbar__links--open" : ""}`}>
          <NavLink to="/" end onClick={closeMenu}>Главная</NavLink>
          <NavLink to="/events" onClick={closeMenu}>События</NavLink>
          {isAuthenticated && (
            <NavLink to="/bookings" onClick={closeMenu}>Мои брони</NavLink>
          )}
          {isAuthenticated && user?.role === "admin" && (
            <NavLink to="/admin" onClick={closeMenu}>Админ</NavLink>
          )}
        </nav>

        <div className={`navbar__actions ${open ? "navbar__actions--open" : ""}`}>
          {isAuthenticated ? (
            <>
              <span className="navbar__user">Привет, {user?.name || "Пользователь"}</span>
              <Button variant="secondary" size="sm" onClick={() => { logout(); closeMenu(); }}>
                Выйти
              </Button>
            </>
          ) : (
            <>
              <NavLink className="navbar__link" to="/login" onClick={closeMenu}>Войти</NavLink>
              <Button to="/register" variant="primary" size="sm" onClick={closeMenu}>Начать</Button>
            </>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
