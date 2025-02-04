import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contesti/useContext";
import { useSwipeable } from "react-swipeable";
import { useState } from "react";

export function Home() {
  const { userLogged, pers } = useUserContext();
  const [participatedEvents, setParticipatedEvents] = useState({});
  const navTo = useNavigate();

  const events = localStorage.getItem("eventi");
  const parseEvents = JSON.parse(events);
  const parseUsers = JSON.parse(localStorage.getItem("users"));
  const parseUser = JSON.parse(localStorage.getItem("user"));

  // logica carosello
  const [currentIndex, setCurrentIndex] = useState(0);
  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    trackMouse: true,
  });

  const handleSwipe = (direction) => {
    if (direction === "left" && currentIndex < parseEvents.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
    if (direction === "right" && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // randomizzazione info post degli utenti
  function randomPostInfo() {
    const indiceCasuale = Math.floor(Math.random() * pers.length);
    return pers[indiceCasuale];
  }
  const personaScelta = randomPostInfo();

  // funzioni bottone partecipa
  const findUser = parseUsers.findIndex(
    (user) => user.email === parseUser.email
  );

  function handlePartecipa(evento) {
    if (!parseUsers[findUser].eventi_preferiti) {
      parseUsers[findUser].eventi_preferiti = [];
    }
    parseUsers[findUser].eventi_preferiti.push(evento);
    localStorage.setItem("users", JSON.stringify(parseUsers));
    setParticipatedEvents({
      ...participatedEvents,
      [evento.id]: true, // Aggiungi l'evento come "partecipato"
    });
  }

  function handleRemovePartecipa(evento) {
    if (parseUsers[findUser].eventi_preferiti) {
      const currentEvent = parseUsers[findUser].eventi_preferiti.findIndex(
        (index) => index.id === evento.id
      );
      if (currentEvent !== -1) {
        parseUsers[findUser].eventi_preferiti.splice(currentEvent, 1);
        localStorage.setItem("users", JSON.stringify(parseUsers));
      }
    }
    setParticipatedEvents({
      ...participatedEvents,
      [evento.id]: false, // Rimuovi l'evento come "partecipato"
    });
  }

  return (
    <div className="home-container">
      <div className="nav-top-home">
        <div className="nav-top-home-info">
          <img
            id="home-user-avatar"
            src={userLogged.img}
            width={60}
            alt="user-icon"
          />
          <div>
            <h3>{userLogged.nome}</h3>
            <h5>Livello 1</h5>
          </div>
        </div>
        <div className="icons-container">
          <a>
            <img src="\calendar-day-svgrepo-com.svg" alt="calendar" />
          </a>
          <a>
            <img src="\bell-svgrepo-com.svg" alt="notify" />
          </a>
        </div>
      </div>
      <div className="home-wrapper" {...handlers}>
        <div
          className="home-carousel"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          {parseEvents.map((evento) => (
            <div key={evento.id} className="home-slide">
              <div className="home">
                <div className="nav-post">
                  <div className="nav-post-user-info">
                    <img id="post-avatar" src={pers.img} alt="user-icon" />
                    <div className="post-info-container">
                      <div className="post-user-info">
                        <h3>{personaScelta.nome}</h3>
                        <h5>Amici</h5>
                        <a>
                          <img
                            id="post-settings-icon"
                            src="\friends-svgrepo-com.svg"
                            alt="post settings"
                          />
                        </a>
                      </div>
                      <h5>Livello {personaScelta.livello}</h5>
                    </div>
                  </div>
                  <div className="icons-container">
                    <button>Live chat</button>
                    <a>
                      <img
                        id="post-settings-icon"
                        src="\dots-horizontal-svgrepo-com.svg"
                        alt="post settings"
                      />
                    </a>
                  </div>
                </div>
                <div className="descrizione-evento">
                  <h3 style={{ fontSize: "clamp(1vw, 5vw, 2rem)" }}>
                    {evento.nome_evento.toUpperCase()}
                  </h3>
                  <p style={{ fontSize: "clamp(1vw, 4vw, 2rem)" }}>
                    {`${evento.start}`} <br /> {`${evento.finish}`}
                  </p>
                </div>
                <div className="map-container">
                  <img
                    src={evento.img}
                    width={290}
                    alt="Mappa"
                    className="mappa"
                  />
                </div>
                <div className="container-partecipanti">
                  <button className="red-btn">Difficile</button>
                  <div>
                    <img
                      src="src\assets\icons\partecipanti.svg"
                      width={70}
                      alt="partecipanti"
                    />
                  </div>
                  <span style={{ fontSize: 12 }}>
                    {`${evento.partecipanti[0]} e altri ${
                      evento.partecipanti.length - 1
                    } stanno partecipando!`}
                  </span>
                </div>
                <div className="info-percorso">
                  <div className="info-box">
                    <img src="src\assets\icons\kilometers.svg" alt="distanza" />
                    <div className="info-box-text">
                      <h3>{evento.distanza}</h3>
                      <span>km</span>
                    </div>
                  </div>
                  <hr />
                  <div className="info-box">
                    <img src="src\assets\icons\clock.svg" alt="orario" />
                    <div className="info-box-text">
                      <h3>{evento.orario}</h3>
                      <span>hr</span>
                    </div>
                  </div>
                  <hr />
                  <div className="info-box">
                    <img src="/src/assets/icons/calendar.svg" alt="data" />
                    <div className="info-box-text">
                      <h3>{evento.data}</h3>
                      <span>data</span>
                    </div>
                  </div>
                </div>
                {!participatedEvents[evento.id] ? (
                  <button
                    onClick={() => handlePartecipa(evento)}
                    style={{ fontSize: "18px" }}
                  >
                    Partecipa!
                  </button>
                ) : (
                  <button
                    onClick={() => handleRemovePartecipa(evento)}
                    style={{ fontSize: "18px", backgroundColor: "red" }}
                  >
                    Abbandona
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="carousel-dots">
        {parseEvents.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {/* ------------------------------------ */}

      <navbar className="nav-bottom-home">
        <a>
          <img src="src\assets\navbar\utente.svg" alt="utente" />
        </a>
        <a>
          <img
            src="src\assets\navbar\preferiti.svg"
            alt="preferiti"
            onClick={() => navTo("/eventipreferiti")}
          />
        </a>
        <a id="nav-bottom-home-addEvent" onClick={() => navTo("/creaevento")}>
          <img src="src\assets\navbar\addEvent.svg" alt="addEvent" />
        </a>
        <a>
          <img
            src="src\assets\navbar\map.svg"
            alt="map"
            onClick={() => navTo("/map")}
          />
        </a>
        <a>
          <img src="src\assets\navbar\impostazioni.svg" alt="impostazioni" />
        </a>
      </navbar>
    </div>
  );
}
