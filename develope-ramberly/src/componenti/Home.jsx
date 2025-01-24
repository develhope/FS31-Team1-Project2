import { useUserContext } from "../contesti/useContext";

export function Home() {
  const { userLogged } = useUserContext();
  console.log(userLogged);
  return (
    <div className="home">
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
        <div className="icons-container">
          <a>
            <img src="\calendar-day-svgrepo-com.svg" alt="calendar" />
          </a>
          <a>
            <img src="\bell-svgrepo-com.svg" alt="notify" />
          </a>
        </div>
      </div>
      <hr style={{ margin: "20px" }} />

      {/* ------------------------------------ */}

      <div className="nav-post-container">
        <div className="nav-user-info">
          <img id="post-avatar" src="https://placehold.co/40" alt="user-icon" />
          <div className="post-info-container">
            <div className="post-user-info">
              <h3>Luca</h3>
              <h5>Amici</h5>
              <a>
                <img
                  id="post-settings-icon"
                  src="\friends-svgrepo-com.svg"
                  alt="post settings"
                />
              </a>
            </div>
            <h5>Livello 17</h5>
            
          </div>
        </div>
        <div className="icons-container">
          <button>Live chat</button>
          <a>
            <img
              id="post-settings-icon"
              src="\dots-horizontal-svgrepo-com.svg"
              alt="post settings"
            />
          </a>
        </div>
        
      </div>
      <div descrizione-evento>
      <p>Corsetta mattutina!</p>
      <p style={{fontSize:12}}>Start:Lecce,Via Copertino-Finish:Lecce, Via Pascoli</p>
      </div>
      <div map-container>
      <img
                src="/src/assets/placeholder-mappa/placeholder-mappa.jpg"
                width={290}
                alt="Mappa"
                className="mappa"
              />
      </div>
      <div className="container-partecipanti">
        <button>Difficile</button>
<div>
  <img src="src\assets\icons\partecipanti.svg" width={40} alt="partecipanti" />
</div>
<span>Simone e altri 6 partecipano</span>
      </div>
    </div>
  );
}
