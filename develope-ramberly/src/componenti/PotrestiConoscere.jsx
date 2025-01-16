import { useNavigate } from "react-router-dom";

export function PotrestiConoscere() {
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

    console.log("Utente iniziale", parseUser);

    //creazione chiave seguiti
    if (!parseUser.seguiti) {
      parseUser.seguiti = [];
    }
    console.log(parseUser.seguiti);

    const utentiSeguiti = parseUser.seguiti.some(
      (utente) => utente.id === profile.id
    );
    if (!utentiSeguiti) {
      parseUser.seguiti.push({
        id: profile.id,
        nome: profile.nome,
        livello: profile.livello,
      });
    }
    console.log(`profilo aggiunto: ${profile.nome}`);

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

                <span>Livello utente: {Math.floor(Math.random() * 100)} </span>
              </div>
              <button
                className="add-button"
                onClick={() => handleAddProfile(profile)}
              >
                {/* <img src="" alt="" className="icon" /> */}
                <span className="icon">👤+</span>
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
