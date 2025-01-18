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

    //creazione chiave seguiti
    if (!parseUser.seguiti) {
      parseUser.seguiti = [];
    }

    // è stato sostituito il controllo su parseUser.seguiti con il match tra email invece che id, dal momento che non esiste una chiave id in user (id: undefined). Questo faceva aggiungere solo l'utente cliccato per la prima volta. Anche il push dell'oggetto riferito all'utente seguito è fatto con email e non con id.

    const utentiSeguiti = parseUser.seguiti.some(
      (utente) => utente.email === profile.email
    );
    if (!utentiSeguiti) {
      parseUser.seguiti.push({
        email: profile.email,
        nome: profile.nome,
        livello: profile.livello,
      });
    }

    localStorage.setItem("user", JSON.stringify(parseUser));
  };

  return (
    <div className="form">
      <h3>Potresti conoscere:</h3>
      <div className="suggested-container">
        <ul>
          {profiles.map((profile) => (
            <li key={profile.id}>
              <div className="suggested-info">
                <img
                  src={profile.img}
                  alt={`Profile ${profile.nome}`}
                  width={70}
                />
                <div className="name-lvl">
                  <p> {profile.nome}</p>
                  <p style={{ fontSize: "13px" }}>
                    Livello: {Math.floor(Math.random() * 100)}{" "}
                  </p>
                </div>
              </div>
              <button
                id="suggested-btn"
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
