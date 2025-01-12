export function PotrestiConoscere() {
  const users = [
    {
      id: 1,
      nome: "Eleonora",
      livello: 42,
    },
    {
      id: 2,
      nome: "Franco",
      livello: 22,
    },
    {
      id: 3,
      nome: "Anna",
      livello: 6,
    },
    {
      id: 4,
      nome: "Jasmine",
      livello: 17,
    },
    {
      id: 5,
      nome: "Giulia",
      livello: 36,
    },
    {
      id: 6,
      nome: "Marco",
      livello: 45,
    },
  ];
  return (
    <div className="users-list-conteiner">
      <h3>Potresti conoscere:</h3>
      <div>
        <ul>
          {users.map((user) => (
            <li key={user.id} className="user-item">
              <div className="user-avatar"></div>
              <div className="user-info">
                <span className="user-name"> {users.name}</span>
                <span className="user-level">{user.livello}</span>
              </div>
              <button className="add-button">
                <span className="icon"></span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button className="back-button">Torna indietro</button>
        <button className="next-button">Avanti</button>
      </div>
    </div>
  );
}
