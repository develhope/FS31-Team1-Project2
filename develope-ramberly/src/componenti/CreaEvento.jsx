import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contesti/useContext";
import { useState } from "react";

export function CreaEvento() {
  const [data, setData] = useState({
    evento: "",
    start: "",
    finish: "",
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
  const daInserire = () => {
    navTo("/");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    daInserire();
  };

  console.log(userLogged);
  return (
    <div className="form">
      <div className="caratteristiche">
        <a href="/" className="link-class">
          <svg
            width="10"
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

        <button type="submit" className="prosegui">
          Avanti
        </button>
      </form>
    </div>
  );
}
