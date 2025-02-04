import { useNavigate } from "react-router-dom";

export default function ListaEventi() {
  const navTo = useNavigate();
  const eventi = JSON.parse(localStorage.getItem("evento")) || [];

  return (
    <ul>
      {eventi.map((x, index) => (
        <li key={index}>
          {x.evento} - {x.img}
        </li>
      ))}
    </ul>
  );
}
