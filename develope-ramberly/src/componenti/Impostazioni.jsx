import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contesti/useContext";

export function Impostazioni() {
  const { userLogged } = useUserContext();
  const navTo = useNavigate();
  console.log(userLogged);
  return (
    <div>
      <div className="titolo-impostazioni">
      <a className="link-class" onClick={() => navTo("/home")}>
        <svg
            width="20"
            height="20"
            viewBox="0 0 18 28"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.825 28L18 14 1.825 0 0 1.715 14.196 14 0 26.285z"
              fill="currentColor"
            ></path>
          </svg>
        </a>
        <h4>Impostazioni account</h4>
      </div>
      <div className="impostazioni">
        <div className="gestione-account">
          <em>GESTIONE ACCOUNT</em>
          <p>Nome: {userLogged.nome}</p>
          <p>Cognome: {userLogged.cognome}</p>
          <p>Email: {userLogged.email}</p>
          <p>Password: {userLogged.password.replace(/./g, "*")}</p>
        </div>
        <hr />
        <div className="privacy">
  <em>PRIVACY</em>
  
  <div className="privacy-option">
    <label className="visibilita">Visibilità:</label>
    <select name="visibilita" className="visibilita">
      <option value="">Seleziona</option>
      <option value="pubblica">Pubblica</option>
      <option value="solo amici">Solo amici</option>
    </select>
  </div>
  
  <h6 className="privacy-description">
    Il profilo completo, comprese le statistiche personali, il numero di
    attività e le informazioni di contatto, sarà visibile a tutti.
  </h6>
  
  <div className="privacy-option">
    <label>Autenticazione a due fattori (2A):</label>
    <select name="autenticazione">
      <option value="">Seleziona</option>
      <option value="si">Si</option>
      <option value="no">No</option>
    </select>
  </div>
  
  <h6 className="privacy-description">
    Per migliorare la sicurezza dell'account, l'utente può abilitare
    l'autenticazione a due fattori.
  </h6>
</div>
        <hr />

        <div className="amici-seguaci">
          <em>GESTIONE AMICIZIE</em>
          <p>Lista di amici</p>
          <p>Segnalazione di abusi o comportamenti inappropriati</p>
          <h6>
            Possibilità di segnalare comportamenti molesti o indesiderati da
            parte di altri utenti.
          </h6>
        </div>
        <hr />
        <div className="logout">
          <em>LOGOUT E ASSISTENZA</em>
          <p onClick={()=>navTo('/login')}>Logout</p>
          <p>Centro Assistenza</p>
          <p>Contattaci</p>
        </div>
      </div>
    </div>
  );
}
