import { useState } from "react";

export default function ScegliSport() {
  const [checked, setChecked] = useState({
    running: false,
    escursione: false,
    biking: false,
    camminata: false,
  });

  const user=localStorage.getItem("user"
  );
  const parseUser=JSON.parse(user)

const handleChange=(event)=>{
  const {value, checked}=event.target
  setChecked((prevState) => ({
    ...prevState,
    [value]: checked,
  }));
}
const handleSubmit=(event)=>{
  event.preventDefault()
  parseUser.sport = {
    ...checked,
  };
localStorage.setItem('user',JSON.stringify(parseUser))
}


  return (
    <div>
      <h3>Scegli sport</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="">Running</label>
        <input
          type="checkbox"
          value="running"
          checked={checked.running}
          onChange={handleChange}
        />
        <label htmlFor="">Escursione</label>
        <input
          type="checkbox"
          value="escursione"
          onChange={handleChange}
          checked={checked.escursione}

        />
        <label htmlFor="">Biking</label>
        <input
          type="checkbox"
          value="biking"
          onChange={handleChange}
          checked={checked.biking}

        />
        <label htmlFor="">Camminata</label>
        <input
          type="checkbox"
          value="camminata"
          checked={checked.camminata}

          onChange={handleChange}
        />
        <button type="submit">Invio</button>
      </form>
    </div>
  );
}
