import { useUserContext } from "../contesti/useContext";

export function Home() {
  const { userLogged } = useUserContext();

  return (
    <>
      <div className="nav-post-container">
        <div className="user-info">
          <img id="user-avatar" src={userLogged.img} alt="user-icon" />
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
        <div className="user-info">
          <img id="post-avatar" src="https://placehold.co/40" alt="user-icon" />
          <div className="post-info-container">
            <div className="user-info-post">
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
            <p>2972 Westheimer Rd. Santa Ana, Illinois 85486</p>
            <p>Corsetta Mattutina!</p>
            <p>+24XP!</p>
          </div>
        </div>
        <div className="icons-container">
          <a>
            <img
              id="post-settings-icon"
              src="\dots-horizontal-svgrepo-com.svg"
              alt="post settings"
            />
          </a>
        </div>
      </div>
    </>
  );
}
