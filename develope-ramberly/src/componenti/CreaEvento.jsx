import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contesti/useContext";
import { useState } from "react";
import { MapComponent } from "./MapComponent";

export function CreaEvento() {
  const [data, setData] = useState({
    evento: "",
    start: "",
    finish: "",
    distanza: "",
    orario: "",
    dataEvento: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { userLogged } = useUserContext();
  const navTo = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navTo("/home");
  };

  return (
    <div className="form">
      <div className="caratteristiche">
        <a className="link-class" onClick={() => navTo("/home")}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 18 28"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            className="Icon__StyledSVG-sc-lm07h6-0 rBpBu Chevronstyles__ChevronIcon-sc-1qql32m-0 gxjmBc GlobalBannerstyles__ControlIcon-sc-adnc4-6 llnoGO"
          >
            <path
              d="M1.825 28L18 14 1.825 0 0 1.715 14.196 14 0 26.285z"
              fill="currentColor"
            ></path>
          </svg>
        </a>

        <h3 className="link-h3-class">Crea il tuo evento!</h3>
      </div>
      <div className="nav-post-container">
        <div className="nav-user-info">
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
      </div>
      {/* ------------------------------------ */}
      <form className="form" onSubmit={handleSubmit}>
        <div className="eventName">
          <label htmlFor="">Nome evento:</label>
          <input
            type="text"
            name="evento"
            onChange={handleChange}
            placeholder="Inserisci nome evento"
            required
          />
        </div>
        <div className="startFinish">
          <div>
            <label htmlFor="">Start:</label>
            <input
              type="text"
              name="start"
              onChange={handleChange}
              placeholder="Luogo partenza..."
              required
            />
          </div>
          <div>
            <label htmlFor="">Finish:</label>
            <input
              type="text"
              name="finish"
              onChange={handleChange}
              placeholder="Luogo d'arrivo..."
              required
            />
          </div>
        </div>
        {/* ----------------------- */}
        <div className="map-container">
          <div className="map">
            <div>
              <MapComponent />
            </div>
            <button className="difficulty-button">Difficile</button>
          </div>
        </div>

        <div className="event-form">
          <div className="event-details">
            <div className="event-items">
              <label>
                <img
                  className="event-icon"
                  src="src\assets\icons\kilometers.svg"
                  alt="distanza"
                />
                Distanza:{" "}
              </label>
              <input
                type="number"
                name="distanza"
                onChange={handleChange}
                required
              />
              <span className="event-unit">km</span>
            </div>

            <div className="event-items">
              <label>
                <img
                  className="event-icon"
                  src="src\assets\icons\clock.svg"
                  alt="orario"
                />
                Orario:
              </label>
              <input
                type="time"
                name="orario"
                onChange={handleChange}
                required
              />
              <span className="event-unit">hr</span>
            </div>

            <div className="event-items">
              <label>
                <img
                  className="event-icon"
                  src="/src/assets/icons/calendar.svg"
                  alt="data"
                />
                Data:
              </label>
              <input
                type="date"
                name="dataEvento"
                onChange={handleChange}
                required
              />
              <span className="event-unit">data</span>
            </div>
          </div>
        </div>
        {/* ------------------------------------ */}

        <div className="event-privacy">
          <label htmlFor="" className="privacy-label">
            Chi può partecipare
          </label>
          <select
            name="partecipanti"
            className="privacy-select"
            onChange={handleChange}
          >
            <option value="solo-amici">Solo amici</option>
            <option value="pubblico">Pubblico</option>
            <option value="privato">Privato</option>
          </select>
        </div>
        {/* ------------------------------------ */}

        <button type="submit" className="prosegui">
          Pubblica evento!
        </button>
      </form>
    </div>
  );
}
