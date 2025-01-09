import { useState } from "react";

export function Registrazione() {
  const [data, setData] = useState({
    nome: "",
    cognome: "",
    email: "",
    password: "",
  });
  const [errore, setErrore] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

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

    // verifica se esiste l'array vuoto
    if (existData) {
      utentiRegistrati = JSON.parse(existData);
    }

    // verifica se l'email esiste o no
    const existEmail = utentiRegistrati.some((x) => x.email === data.email);

    // verifica se l'email non esiste
    if (existEmail) {
      setErrorEmail("Email già registrata");
      return;
    }

    utentiRegistrati.push(data);
    localStorage.setItem("users", JSON.stringify(utentiRegistrati));
    setData({
      nome: "",
      cognome: "",
      email: "",
      password: "",
    });
    console.log("hai cliccato submit");
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
        />
        <label htmlFor="Cognome">Cognome:</label>
        <input
          type="text"
          name="cognome"
          id="cognome"
          placeholder="Cognome..."
          onChange={handleChange}
          value={data.cognome}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email..."
          onChange={handleChange}
          value={data.email}
        />
        <label htmlFor="Password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password..."
          onChange={handleChange}
          value={data.password}
        />
        {errore && <p style={{ color: "red" }}> {errore}</p>}
        {errorEmail && <p style={{ color: "red" }}> {errorEmail}</p>}
        <button disabled={errore ? true : false} type="submit">
          {" "}
          Registrati
        </button>
      </form>
    </div>
  );
}
