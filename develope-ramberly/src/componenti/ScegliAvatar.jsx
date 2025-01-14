import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ScegliAvatar() {
  const [url, setUrl] = useState("");

  const navTo = useNavigate();
  const caratteristiche= ()=>{
    navTo('/caratteristiche')
  } 

  const user = localStorage.getItem("user");
  const parseUser = JSON.parse(user);

  const users = localStorage.getItem("users");
  const parseUsers = JSON.parse(users);

  const userImg = {
    ...parseUser,
    img: url,
  };

  function handleImage(event) {
    event.preventDefault();
    setUrl(event.target.src);

    localStorage.setItem("user", JSON.stringify(userImg));
  }

  function handleSubmit(event) {
    event.preventDefault();

    parseUsers.push(userImg);
    localStorage.setItem("users", JSON.stringify(parseUsers));

    localStorage.setItem("user", "");
  }

  return (
    <div className="form">
      <h3>Scegli il tuo Avatar</h3>
      <div className="avatar-container">
        <img src="https://placehold.co/40" alt="" onClick={handleImage} />
        <img src="https://placehold.co/40" alt="" onClick={handleImage} />
        <img src="https://placehold.co/40" alt="" onClick={handleImage} />
        <img src="https://placehold.co/40" alt="" onClick={handleImage} />
        <img src="https://placehold.co/40" alt="" onClick={handleImage} />
        <img src="https://placehold.co/40" alt="" onClick={handleImage} />
      </div>
      <button
        type="button"
        onClick={caratteristiche}
      >
        Torna indietro
      </button>
      <button type="submit" onClick={handleSubmit}>
        Avanti
      </button>
    </div>
  );
}
