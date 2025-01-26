import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ScegliSport() {
  const [checked, setChecked] = useState({
    running: false,
    escursione: false,
    biking: false,
    camminata: false,
  });

  const navTo = useNavigate();
  const caratteristiche = () => {
    navTo("/caratteristiche");
  };
  // const potresticonoscere = () => {
  //   navTo("/creaevento");
  // };
  const potresticonoscere = () => {
    navTo("/potresticonoscere");
  };

  const user = localStorage.getItem("user");
  const parseUser = JSON.parse(user);

  const handleChange = (event) => {
    const { value, checked } = event.target;
    setChecked((prevState) => ({
      ...prevState,
      [value]: checked,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    parseUser.sports = checked;

    localStorage.setItem("user", JSON.stringify(parseUser));

    potresticonoscere();
  };

  return (
    <div className="main-container">
      <div className="form">
        <p className="superscript">Step 2/4</p>
        <div className="caratteristiche">
          <a
            href="/caratteristiche"
            className="link-class"
            onClick={caratteristiche}
          >
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

          <h3 className="link-h3-class">Scegli il tuo sport preferito!</h3>
        </div>

        <form className="form-sports" onSubmit={handleSubmit}>
          <div className="sports-input">
            <div className="checkbox-container">
              <div className="img-sports">
                <img
                  src="src\assets\icons\running.svg"
                  alt="calendar"
                  width={25}
                />
              </div>{" "}
              <label>Running</label>
              <input
                type="checkbox"
                value="running"
                checked={checked.running}
                onChange={handleChange}
              />
            </div>
            <div className="checkbox-container">
              <div className="img-sports">
                <img
                  src="src\assets\icons\escursione.svg"
                  alt="calendar"
                  width={25}
                />
              </div>{" "}
              <label>Escursione</label>
              <input
                type="checkbox"
                value="escursione"
                checked={checked.escursione}
                onChange={handleChange}
              />
            </div>
            <div className="checkbox-container">
              <div className="img-sports">
                <img
                  src="src\assets\icons\biking.svg"
                  alt="calendar"
                  width={25}
                />
              </div>{" "}
              <label>Biking</label>
              <input
                type="checkbox"
                value="biking"
                checked={checked.biking}
                onChange={handleChange}
              />
            </div>
            <div className="checkbox-container">
              <div className="img-sports">
                <img
                  src="src\assets\icons\camminata.svg"
                  alt="calendar"
                  width={25}
                />
              </div>
              <label>Camminata</label>
              <input
                type="checkbox"
                value="camminata"
                checked={checked.camminata}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="prosegui">
            Avanti
          </button>
        </form>
      </div>
    </div>
  );
}
