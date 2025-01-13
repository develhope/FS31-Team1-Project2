import { useState } from "react";

export function ScegliAvatar() {
  const [url, setUrl] = useState("");

  const user = localStorage.getItem("user");
  const parseUser = JSON.parse(user);

  const userImg = {
    ...user,
    img: url,
  };

  function handleImage(src) {
    setUrl(src);
  }

  localStorage.setItem("user", JSON.stringify(userImg));

  return (
    <div>
      <h3>Scegli il tuo Avatar</h3>
      <div>
        <img src="" alt="" onClick={() => handleImage()} />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
      </div>
    </div>
  );
}
