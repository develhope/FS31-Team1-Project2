export function EventiPreferiti(){
    return (
        <>
          <div className="title-preferiti">
          <h3>EVENTI PREFERITI</h3>
          </div>
        <div className="eventi-preferiti">
         
        



<div className="utente-titolo">
          <img id="post-avatar" src="https://placehold.co/40" alt="user-icon" />
          <div className="post-info-container">
            <div className="post-user-info">
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
          </div>

          <p>Corsetta Mattutina</p>
        </div>
        
            
          

<div className="info-evento-preferiti">
    <div className="map-preferiti">
    <img
                src="/src/assets/placeholder-mappa/placeholder-mappa.jpg"
                width={150}
                alt="Mappa"
                className="mappa"
              />    </div>
              <div className="box-dati-preferiti">
    <div className="km-preferiti">
    <img src="src\assets\icons\kilometers.svg"alt="calendar" width={25} />
    <p>10</p>
    </div>
    <div className="orario-preferiti">
    <img src="src\assets\icons\clock.svg"alt="calendar" width={25} />
    <p>18:00 </p>
    </div>
    <div className="data-preferiti">
    <img src="src\assets\icons\calendar.svg"alt="calendar" width={25} />
    <p>25/02/2025</p>
    </div>


</div>

</div>
<div className="btn-eventi-preferiti">
<button className="btn-facile">Facile</button>
<button className="red-btn">Rimuovi</button>
</div>

    </div>
    
        </>
      
    )
  
}