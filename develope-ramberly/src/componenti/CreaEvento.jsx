import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contesti/useContext";

export function CreaEvento() {
  const { userLogged } = useUserContext();
  const navTo = useNavigate();
  const daInserire = () => {
    navTo("/");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    daInserire();
  };

  console.log(userLogged);
  return (
    <div className="home">
      <div className="caratteristiche">
        <a href="/" className="link-class">
          <svg
            width="10"
            height="20"
            viewBox="0 0 18 28"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            className="Icon__StyledSVG-sc-lm07h6-0 rBpBu Chevronstyles__ChevronIcon-sc-1qql32m-0 gxjmBc GlobalBannerstyles__ControlIcon-sc-adnc4-6 llnoGO"
          >
            <path
              d="M1.825 28L18 14 1.825 0 0 1.715 14.196 14 0 26.285z"
              fill="currentColor"
            ></path>
          </svg>
        </a>

        <h3 className="link-h3-class">Crea il tuo evento!</h3>
      </div>
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
      </div>
      <hr style={{ margin: "20px" }} />

      {/* ------------------------------------ */}

      <button type="submit" className="prosegui" onClick={handleSubmit}>
        Avanti
      </button>
    </div>
  );
}
