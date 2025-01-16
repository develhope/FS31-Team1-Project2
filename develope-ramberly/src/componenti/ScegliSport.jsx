import { useEffect, useState } from "react";

export default function ScegliSport() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState({
    running: false,
    escursione: false,
    biking: false,
    camminata: false,
  });

  localStorage.setItem("user", JSON.stringify());

  const handleSubmit = (event) => {
    event.preventDefault();
    const checked = event.target.checked;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setData((prevData) => ({
      ...prevData,
      [name]: true,
    }));
  };

  return (
    <div>
      <h3>Scegli sport</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="">Running</label>
        <input
          type="checkbox"
          name="running"
          value={data.running}
          onChange={handleChange}
        />
        <label htmlFor="">Escursione</label>
        <input
          type="checkbox"
          name="escursione"
          value={data.escursione}
          onChange={handleChange}
        />
        <label htmlFor="">Biking</label>
        <input
          type="checkbox"
          name="biking"
          value={data.biking}
          onChange={handleChange}
        />
        <label htmlFor="">Camminata</label>
        <input
          type="checkbox"
          name="camminata"
          value={data.camminata}
          onChange={handleChange}
        />
        <button type="submit">Invio</button>
      </form>
    </div>
  );
}
