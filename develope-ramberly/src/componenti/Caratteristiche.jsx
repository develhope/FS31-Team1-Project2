import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Caratteristiche() {
  const users = localStorage.getItem("users");
  const parseUsers = JSON.parse(users);

  const user=localStorage.getItem('user')
  const parseUser=JSON.parse(user)

  const [caratteristiche, setCaratteristiche] = useState({
    sesso: "",
    peso: "",
    attivita: "",
    monitoraggio: "",
    gruppo: "",
    sfide: "",
  });

  const navToRegistrazione = useNavigate();

  function handleChange(event) {
    const { id, value } = event.target;

    setCaratteristiche((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const userIdExist = parseUsers.find((x) => x.id === caratteristiche.id);
console.log(userIdExist)
    // userIdExist.push(caratteristiche);
    const userUpdated = { ...parseUser, ...caratteristiche };
    console.log(userUpdated);

    localStorage.setItem("user", JSON.stringify(userUpdated));
  };

  return (
    <div>
      <h4>LE TUE CARATTERISTICHE!</h4>
      <form className="form" onSubmit={handleSubmit}>
        <label>Sesso:</label>
        <select id="sesso" onChange={handleChange}>
          Scegli un opzione:
          <option value="uomo">Uomo</option>
          <option value="donna">Donna</option>
        </select>

        <label>Inserisci il tuo peso</label>
        <input type="number" id="peso" />

        <label> Inserisci la tua età!</label>
        <input type="number" id="eta" />

        <label>Quanto spesso fai attività fisica?</label>
        <select id="attivita" onChange={handleChange}>
          Scegli un opzione:
          <option value="0">Quasi mai</option>
          <option value="2">1-2 volte a settimana</option>
          <option value="4">3-4 volte a settimana</option>
          <option value="5">Più di 5 volte a settimana</option>
        </select>

        <label>
          Hai esperienza con il monitoraggio delle attività fisiche?
        </label>
        <select id="monitoraggio" onChange={handleChange}>
          Scegli un opzione:
          <option value="si">Si</option>
          <option value="no">No</option>
        </select>

        <label>Ti piace allenarti da solo o in gruppo?</label>
        <select id="gruppo" onChange={handleChange}>
          Scegli un opzione:
          <option value="solo">Solo</option>
          <option value="gruppo">Gruppo</option>
          <option value="entrambi">Entrambi</option>
        </select>

        <label>
          Ti piacerebbe partecipare partecipare a sfide o gare tramite l'app?{" "}
        </label>
        <select id="sfide" onChange={handleChange}>
          Scegli un opzione:
          <option value="si">Si</option>
          <option value="no">No</option>
        </select>

        <button
          type="button"
          onClick={() => navToRegistrazione("/registrazione")}
        >
          Torna indietro
        </button>
        <button type="submit">Avanti</button>
      </form>
    </div>
  );
}
