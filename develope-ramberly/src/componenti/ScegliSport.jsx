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
    <div>
      <h3>Scegli sport</h3>

      <form onSubmit={handleSubmit}>
        <label>Running</label>
        <input
          type="checkbox"
          value="running"
          checked={checked.running}
          onChange={handleChange}
        />
        <label>Escursione</label>
        <input
          type="checkbox"
          value="escursione"
          onChange={handleChange}
          checked={checked.escursione}
        />
        <label>Biking</label>
        <input
          type="checkbox"
          value="biking"
          onChange={handleChange}
          checked={checked.biking}
        />
        <label>Camminata</label>
        <input
          type="checkbox"
          value="camminata"
          checked={checked.camminata}
          onChange={handleChange}
        />

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
