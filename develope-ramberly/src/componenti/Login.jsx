import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../contesti/useContext";

export function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [messaggio, setMessaggio] = useState("");
  const { login } = useContext(UserContext);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleLogin = (event) => {
    event.preventDefault();
    const users = localStorage.getItem("users");
    const parseUsers = JSON.parse(users);
    console.log(parseUsers);
    const userExist = parseUsers.find(
      (x) => x.email === data.email && x.password === data.password
    );
    console.log(userExist);
    if (userExist) {
      setMessaggio("login effettuato con successo");
      login(userExist);
    } else {
      setMessaggio("credenziali errate");
    }
  };

  return (
    <div className="box">
      <form className="form" onSubmit={handleLogin}>
        <h3>Login</h3>
        <label htmlFor="">Email:</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Email..."
        />
        <label htmlFor="">Password:</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password..."
        />
        <button type="submit">Login</button>
        {messaggio && <p style={{ color: "red" }}>{messaggio}</p>}
      </form>
    </div>
  );
}
