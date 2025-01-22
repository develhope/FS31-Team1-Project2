import {  useState } from "react";
import { useNavigate } from "react-router-dom";


export function PotrestiConoscere() {
  const [seguendo, setSeguendo] = useState([]);
 
  const navTo = useNavigate();
  const scegliAvatar = () => {
    navTo("/scegliavatar");
  };
  const scegliereSport = () => {
    navTo("/sceglieresport");
  };

  const users = localStorage.getItem("users");
  const profiles = JSON.parse(users);
  
 
 
  const handleAddProfile = (profile) => {
    const user = localStorage.getItem("user");
    const parseUser = JSON.parse(user);

    if (!parseUser.seguiti) {
      parseUser.seguiti = [];
    }

    // Verifica se l'utente è già nei seguiti
    const utentiSeguiti = parseUser.seguiti.findIndex(
      (utente) => utente.email === profile.email
    );

    if (utentiSeguiti === -1) {
      parseUser.seguiti.push({
        nome: profile.nome,
        email: profile.email,
      });
      setSeguendo([...seguendo, { nome: profile.nome, email: profile.email }]);
    } else {
      parseUser.seguiti.splice(utentiSeguiti, 1);
      setSeguendo(seguendo.filter((utente) => utente.email !== profile.email));
    }

    localStorage.setItem("user", JSON.stringify(parseUser));
    console.log("Utente aggiornato:", parseUser);
  };

  return (
    <div className="form">
      <h3>Potresti conoscere:</h3>
      <div className="list-container">
        <ul>
          {profiles.map((profile) => (
            <li key={profile.id} className="user-item">
              <div className="user-avatar">
                <img src={profile.img} alt={`Profile ${profile.nome}`} />
              </div>
              <div className="user-info">
                <span className="user-name"> {profile.nome}</span>
                <span>Livello utente:{profile.livello} </span>
              </div>
              <button
                className="add-button"
                onClick={() => handleAddProfile(profile)}
              >
                {seguendo.some((utente) => utente.email === profile.email)
                  ? "👤-"
                  : "👤+"}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="form-btn-container">
        <button className="back-button" onClick={scegliereSport}>
          Torna indietro
        </button>
        <button className="next-button" onClick={scegliAvatar}>
          Avanti
        </button>
      </div>
    </div>
  );
}
