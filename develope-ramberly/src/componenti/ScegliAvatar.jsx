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
  }

  function handleImage(event) {
    const src = event.target.src;
    setUrl(src);

    const UpdatedUserImg = {
      ...parseUser,
      img: src,
    }

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

    login()

  }

  return (
    <div className="form">
      <h3>Scegli il tuo Avatar</h3>
      <div className="avatar-container">
        <img src="\src\assets\avatar\avatar (1).svg" width={70} alt="avatar1" onClick={handleImage} />
        <img src="\src\assets\avatar\avatar (2).svg" width={70} alt="avatar1" onClick={handleImage} />
        <img src="\src\assets\avatar\avatar (3).svg" width={70} alt="avatar1" onClick={handleImage} />
        <img src="\src\assets\avatar\avatar (4).svg" width={70} alt="avatar1" onClick={handleImage} />
        <img src="\src\assets\avatar\avatar (5).svg" width={70} alt="avatar1" onClick={handleImage} />
        <img src="\src\assets\avatar\avatar (6).svg" width={70} alt="avatar1" onClick={handleImage} />
        <img src="\src\assets\avatar\avatar (7).svg" width={70} alt="avatar1" onClick={handleImage} />
        <img src="\src\assets\avatar\avatar (8).svg" width={70} alt="avatar1" onClick={handleImage} />
        <img src="\src\assets\avatar\avatar (9).svg" width={70} alt="avatar1" onClick={handleImage} />
        <img src="\src\assets\avatar\avatar (10).svg" width={70} alt="avatar1" onClick={handleImage} />
        <img src="\src\assets\avatar\avatar (11).svg" width={70} alt="avatar1" onClick={handleImage} />
        <img src="\src\assets\avatar\avatar (12).svg" width={70} alt="avatar1" onClick={handleImage} />

      </div>
      <div className="form-btn-container">
      <button type="button" onClick={potrestiConoscere}>
        Torna indietro
      </button>
      <button type="submit" onClick={handleSubmit}>
        Avanti
      </button>
      </div>
      
    </div>
  );
}
