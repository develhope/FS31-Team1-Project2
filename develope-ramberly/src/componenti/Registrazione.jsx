import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export function Registrazione() {
  const [data, setData] = useState({
    nome: "",
    cognome: "",
    email: "",
    password: "",
  });
  const [errore, setErrore] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const navToCaratteristiche = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "password") {
      if (
        value.length < 6 ||
        !/\d/.test(value) ||
        !/[!@#$%^&*()]/.test(value)
      ) {
        setErrore(
          "La password deve contenere almeno sei caratteri di cui almeno un carattere speciale e una lettera maiuscola"
        );
      } else {
        setErrore("");
      }
    }
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (errore) return;
    const existData = localStorage.getItem("users");
    let utentiRegistrati = [];

    if (existData) {
      utentiRegistrati = JSON.parse(existData);
    }

    const existEmail = utentiRegistrati.some((x) => x.email === data.email);

    if (existEmail) {
      setErrorEmail("Email già registrata");
      return;
    }

    const newIdUser = {
      ...data,
      id: utentiRegistrati.length + 1,
    };

    utentiRegistrati.push(newIdUser);
    localStorage.setItem("users", JSON.stringify(utentiRegistrati));

    setData({
      nome: "",
      cognome: "",
      email: "",
      password: "",
    });

    navToCaratteristiche("/caratteristiche");
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="Nome">Nome:</label>
        <input
          type="text"
          name="nome"
          id="nome"
          placeholder="Nome..."
          onChange={handleChange}
          value={data.nome}
          required
        />
        <label htmlFor="Cognome">Cognome:</label>
        <input
          type="text"
          name="cognome"
          id="cognome"
          placeholder="Cognome..."
          onChange={handleChange}
          value={data.cognome}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email..."
          onChange={handleChange}
          value={data.email}
          required
        />
        <label htmlFor="Password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password..."
          onChange={handleChange}
          value={data.password}
          required
        />
        {errore && <p style={{ color: "red" }}> {errore}</p>}
        {errorEmail && <p style={{ color: "red" }}> {errorEmail}</p>}
        <button disabled={errore ? true : false} type="submit">
          {" "}
          Vai avanti
        </button>
        <p>
          Hai già un account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
