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
    <div className="scegli-sport">
      <h3>Scegli il tuo sport preferito!</h3>

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
          <hr />
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
          <hr />

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
          <hr />

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
          <hr />
        </div>

        <div className="b-n-button">
          <button
            type="button"
            className="back-button"
            onClick={caratteristiche}
          >
            Torna indietro
          </button>
          <button type="submit" className="next-button">
            Avanti
          </button>
        </div>
      </form>
    </div>
  );
}
