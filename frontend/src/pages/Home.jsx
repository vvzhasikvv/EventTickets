import { Link } from "react-router-dom";
import Button from "../components/ui/Button.jsx";
import Container from "../components/ui/Container.jsx";

const Home = () => {
  return (
    <section className="hero">
      <Container className="hero__inner">
        <div className="hero__copy">
          <span className="tag">Главное</span>
          <h1>Бронируйте лучшие события за минуты.</h1>
          <p>
            Открывайте отобранные события, бронируйте билеты мгновенно и храните всё
            в одном месте.
          </p>
          <div className="hero__actions">
            <Button to="/events">Смотреть события</Button>
          </div>
        </div>
        <div className="hero__panel">
          <div className="hero__card">
            <h3>Сегодня в 17:00</h3>
            <p>Наурыз</p>
            <div className="hero__meta">
              <span>Билеты продаются</span>
              <span>2500 ₸</span>
            </div>
          </div>
          <div className="hero__stats">
            <div>
              <strong>Смотрите</strong>
              <span>События</span>
            </div>
            <div>
              <strong>Покупайте</strong>
              <span>Билеты</span>
            </div>
           
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Home;
