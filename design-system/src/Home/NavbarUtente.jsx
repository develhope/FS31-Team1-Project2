export function NavbarUtente() {
  return (
    <>
      <div className="nav-post-container">
        <div className="user-info">
          <img id="user-avatar" src="https://placehold.co/40" alt="user-icon" />
          <div>
            <h3>Francesca</h3>
            <h5>Livello 1</h5>
          </div>
        </div>
        <div className="icons-container">
          <a>
            <img src="\calendar-day-svgrepo-com.svg" alt="calendar" />
          </a>
          <a>
            <img src="\bell-svgrepo-com.svg" alt="notify" />
          </a>
        </div>
      </div>
      <hr style={{ margin: "20px" }} />
    </>
  );
}
