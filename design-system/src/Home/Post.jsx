export function Post() {
  return (
    <>
      <div className="nav-post-container">
        <div className="user-info">
          <img id="post-avatar" src="https://placehold.co/40" alt="user-icon" />
          <div className="post-info-container">
            <div className="user-info-post">
              <h3>Luca</h3>
              <h5>Amici</h5>
              <a>
                <img
                  id="post-settings-icon"
                  src="\friends-svgrepo-com.svg"
                  alt="post settings"
                />
              </a>
            </div>
            <h5>Livello 17</h5>
            <p>2972 Westheimer Rd. Santa Ana, Illinois 85486</p>
            <p>Corsetta Mattutina!</p>
            <p>+24XP!</p>
          </div>
        </div>
        <div className="icons-container">
          <a>
            <img
              id="post-settings-icon"
              src="\dots-horizontal-svgrepo-com.svg"
              alt="post settings"
            />
          </a>
        </div>
      </div>
      <div className="box-map">
        <img src="https://placehold.co/300x200" alt="mappa" />
      </div>
      <div className="interactions">
        <div className="likes">
          <button className="heart">
            <img src="\heart-svgrepo-com.svg" width={24} alt="heart-like" />
          </button>
          <span>
            <img
              src="\multiple-user-avatars-svgrepo-com.svg"
              width={28}
              alt=""
            />
          </span>
        </div>

        <div className="share-save">
          <button className="share">
            <img src="\share-nodes-svgrepo-com.svg" width={24} alt="share" />
          </button>
          <button className="save">
            <img src="\bookmark-svgrepo-com (1).svg" width={24} alt="save" />
          </button>
        </div>
      </div>
      <div className="progress">
        <h4>KM: 10,42</h4>
        <h4>01:24:13</h4>
        <h4>5,33/KM</h4>
      </div>
      <hr />
    </>
  );
}
