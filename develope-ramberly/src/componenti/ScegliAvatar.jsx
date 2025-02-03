import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contesti/useContext";

export function ScegliAvatar() {
  const [url, setUrl] = useState("");

  const navTo = useNavigate();
  const potrestiConoscere = () => {
    navTo("/potresticonoscere");
  };

  const { setIsLogged } = useContext(UserContext);

  setIsLogged(false);

  const user = localStorage.getItem("user");
  const parseUser = JSON.parse(user);

  const users = localStorage.getItem("users");
  const parseUsers = JSON.parse(users);

  const userImg = {
    ...parseUser,
    img: url,
  };

  function handleImage(event) {
    const src = event.target.src;
    setUrl(src);

    const UpdatedUserImg = {
      ...parseUser,
      img: src,
    };

    localStorage.setItem("user", JSON.stringify(UpdatedUserImg));
  }

  const login = () => {
    navTo("/login");
  };

  function handleSubmit(event) {
    event.preventDefault();

    parseUsers.push(userImg);
    localStorage.setItem("users", JSON.stringify(parseUsers));

    localStorage.setItem("user", "");

    login();
  }

  return (
    <div className="main-container">
      <div className="form">
        <p className="superscript">Step 4/4</p>
        <div className="caratteristiche">
          <a href="/potresticonoscere" className="link-class">
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

          <h3 className="link-h3-class">Scegli il tuo avatar!</h3>
        </div>
        <div className="avatar-container">
          <img
            src="\src\assets\avatar\avatar (1).avif"
            width={70}
            alt="avatar1"
            onClick={handleImage}
            loading="lazy"
          />
          <img
            src="\src\assets\avatar\avatar (2).avif"
            width={70}
            alt="avatar1"
            onClick={handleImage}
            loading="lazy"
          />
          <img
            src="\src\assets\avatar\avatar (3).avif"
            width={70}
            alt="avatar1"
            onClick={handleImage}
            loading="lazy"
          />
          <img
            src="\src\assets\avatar\avatar (4).avif"
            width={70}
            alt="avatar1"
            onClick={handleImage}
            loading="lazy"
          />
          <img
            src="\src\assets\avatar\avatar (5).avif"
            width={70}
            alt="avatar1"
            onClick={handleImage}
            loading="lazy"
          />
          <img
            src="\src\assets\avatar\avatar (6).avif"
            width={70}
            alt="avatar1"
            onClick={handleImage}
            loading="lazy"
          />
          <img
            src="\src\assets\avatar\avatar (7).avif"
            width={70}
            alt="avatar1"
            onClick={handleImage}
            loading="lazy"
          />
          <img
            src="\src\assets\avatar\avatar (8).avif"
            width={70}
            alt="avatar1"
            onClick={handleImage}
            loading="lazy"
          />
          <img
            src="\src\assets\avatar\avatar (9).avif"
            width={70}
            alt="avatar1"
            onClick={handleImage}
            loading="lazy"
          />
          <img
            src="\src\assets\avatar\avatar (10).avif"
            width={70}
            alt="avatar1"
            onClick={handleImage}
            loading="lazy"
          />
          <img
            src="\src\assets\avatar\avatar (11).avif"
            width={70}
            alt="avatar1"
            onClick={handleImage}
            loading="lazy"
          />
          <img
            src="\src\assets\avatar\avatar (12).avif"
            width={70}
            alt="avatar1"
            onClick={handleImage}
            loading="lazy"
          />
        </div>

        <button type="submit" className="prosegui" onClick={handleSubmit}>
          Avanti
        </button>
      </div>
    </div>
  );
}
