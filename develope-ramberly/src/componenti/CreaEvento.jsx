import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contesti/useContext";
import { useEffect, useState } from "react";
import { MapComponent } from "./MapComponent";

export function CreaEvento() {
  const [data, setData] = useState({
    evento: "",
    start: "",
    finish: "",
    distanza: "",
    orario: "",
    dataEvento: "",
    img: "",
  });
  const {
    suggestionsR,
    destination,
    markerR,
    handleSearchR,
    mapContainerRef,
    userLocation,
    marker,
    distance,
    searchQuery,
    searchQueryR,
    setSearchQueryR,
    setSearchQuery,
    suggestions,
    handleMapClick,
    handleSearch,
    handleResetPosition,
    takeScreenshot,
    handleSuggestionSelectR,
    handleSuggestionSelect,
    handleInputChange,
    handleInputChangeR,
    calculateRoute,
  } = MapComponent();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { userLogged } = useUserContext();
  const navTo = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const screenshotUrl = await takeScreenshot();

      if (!screenshotUrl) {
        throw new Error("Screenshot non acquisito");
      }

      const newData = { ...data, img: screenshotUrl };

      const existData = localStorage.getItem("evento");
      let utentiRegistrati = existData ? JSON.parse(existData) : [];

      utentiRegistrati.push(newData);

      localStorage.setItem("evento", JSON.stringify(utentiRegistrati));

      console.log("Dati salvati con successo!", utentiRegistrati);

      navTo("/home");
    } catch (error) {
      console.error("Errore nel salvataggio:", error);
    }
  };

  return (
    <div className="form">
      <div className="caratteristiche">
        <a className="link-class" onClick={() => navTo("/home")}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 18 28"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            className="Icon__StyledSVG-sc-lm07h6-0 rBpBu Chevronstyles__ChevronIcon-sc-1qql32m-0 gxjmBc GlobalBannerstyles__ControlIcon-sc-adnc4-6 llnoGO"
          >
            <path
              d="M1.825 28L18 14 1.825 0 0 1.715 14.196 14 0 26.285z"
              fill="currentColor"
            ></path>
          </svg>
        </a>

        <h3 className="link-h3-class">Crea il tuo evento!</h3>
      </div>
      <div className="nav-post-container">
        <div className="nav-user-info">
          <img
            id="home-user-avatar"
            src={userLogged.img}
            width={60}
            alt="user-icon"
          />
          <div>
            <h3>{userLogged.nome}</h3>
            <h5>Livello 1</h5>
          </div>
        </div>
      </div>
      {/* ------------------------------------ */}
      <form className="form" onSubmit={handleSubmit}>
        <div className="eventName">
          <label htmlFor="">Nome evento:</label>
          <input
            type="text"
            name="evento"
            onChange={handleChange}
            placeholder="Inserisci nome evento"
          />
        </div>

        {/* ----------------------- */}
        <div className="map-container">
          <div className="map">
            <div>
              <div>
                <div className="search-location">
                  <div className="startFinish">
                    <div>
                      <label htmlFor="">Start:</label>
                      <input
                        type="text"
                        placeholder="Luogo Partenza..."
                        name="start"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          handleInputChange();
                          handleChange(e);
                        }}
                      />
                      {suggestions.length > 0 && (
                        <ul className="suggestions-list">
                          {suggestions.map((suggestion, index) => (
                            <li
                              key={index}
                              onClick={() => handleSuggestionSelect(suggestion)}
                            >
                              {suggestion.place_name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div>
                      <label htmlFor="">Finish:</label>
                      <input
                        type="text"
                        placeholder="Luogo arrivo..."
                        name="finish"
                        value={searchQueryR}
                        onChange={(e) => {
                          setSearchQueryR(e.target.value);

                          handleInputChangeR();
                          handleChange(e);
                        }}
                      />
                      {suggestionsR.length > 0 && (
                        <ul className="suggestions-list">
                          {suggestionsR.map((suggestionR, index) => (
                            <li
                              key={index}
                              onClick={() =>
                                handleSuggestionSelectR(suggestionR)
                              }
                            >
                              {suggestionR.place_name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  className="btn-search"
                  type="button"
                  onClick={() => {
                    calculateRoute();
                    handleSearch();
                    handleSearchR();
                  }}
                >
                  Cerca
                </button>
                {/* Mostriamo i suggerimenti sotto il campo di ricerca */}
              </div>

              {userLocation ? (
                <div
                  id="map-box"
                  ref={mapContainerRef}
                  style={{ width: "100%", height: "500px" }}
                />
              ) : (
                <p>Loading map...</p>
              )}

              <button
                className="map-reset-btm"
                type="button"
                onClick={handleResetPosition}
              >
                Reset Position
              </button>
              <button
                className="map-add-marker-btm"
                onClick={() => mapRef.current.on("click", handleMapClick)}
              >
                Add Marker
              </button>
            </div>
            <button className="difficulty-button">Difficile</button>
          </div>
        </div>

        <div className="event-form">
          <div className="event-details">
            <div className="event-items">
              <label>
                <img
                  className="event-icon"
                  src="src\assets\icons\kilometers.svg"
                  alt="distanza"
                />
                Distanza:{" "}
              </label>
              <input type="text" name="distanza" value={distance} />
              <span className="event-unit">km</span>
            </div>

            <div className="event-items">
              <label>
                <img
                  className="event-icon"
                  src="src\assets\icons\clock.svg"
                  alt="orario"
                />
                Orario:
              </label>
              <input type="time" name="orario" onChange={handleChange} />
              <span className="event-unit">hr</span>
            </div>

            <div className="event-items">
              <label>
                <img
                  className="event-icon"
                  src="/src/assets/icons/calendar.svg"
                  alt="data"
                />
                Data:
              </label>
              <input type="date" name="dataEvento" onChange={handleChange} />
              <span className="event-unit">data</span>
            </div>
          </div>
        </div>
        {/* ------------------------------------ */}

        <div className="event-privacy">
          <label htmlFor="" className="privacy-label">
            Chi può partecipare
          </label>
          <select
            name="partecipanti"
            className="privacy-select"
            onChange={handleChange}
          >
            <option value="solo-amici">Solo amici</option>
            <option value="pubblico">Pubblico</option>
            <option value="privato">Privato</option>
          </select>
        </div>
        {/* ------------------------------------ */}

        <button type="submit" className="prosegui">
          Pubblica evento!
        </button>
      </form>
    </div>
  );
}
