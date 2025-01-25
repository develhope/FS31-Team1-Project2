import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

export function MapComponent() {
  //impostiamo i riferimenti per la manipolzione della mappa e per la gestione del suo conteniutore
  const mapRef = useRef();
  const mapContainerRef = useRef();
  //imposto lo useState della posizione del mio utente per gestirla in seguito all'interno dello useEffetct e determinare quindi le coordinate dello user
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    //controllo l'esistenza di navigator.geolocation prima di andare a recuperare le informazioni delle coordinate
    if (navigator.geolocation) {
      //uso getcurrent position per ottenere i valori di latitudine e longitudine e li destrutturo partendo dal position.coords
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          //usiamo setuserLocation per impostare i valori ottenuti dilatitudine e longitudine in un array leggibile dalla nostra  mappa
          setUserLocation([longitude, latitude]);
        },

        //in caso di errore nel caricamento della posizione imposto una posizione generica di render, in questo caso newyork
        (error) => {
          console.error("Error fetching location:", error.message);
          setUserLocation([-74.006, 40.7128]);
        }
      );
    } else {
      //se navigator.geolocation non è a tru imposto un else per avere in console un errore e impostare comunque la mia posizione di default
      console.error("Geolocation is not supported by your browser.");
      setUserLocation([-74.006, 40.7128]);
    }
  }, []);

  useEffect(() => {
    //controllo che userlocation esista prima di operare ulteriormente
    if (!userLocation) return;

    //impostiamo un valore a mapboxgl.accesToken per avere il riferimento al profilo utilizzato per la libreria
    mapboxgl.accessToken =
      "pk.eyJ1Ijoia2FyYXN1MDBnIiwiYSI6ImNtNmMxb2RjODBjNGQyanNjYWh2anl3aDYifQ.6Y73zxmEAj307vBJe-AmIw";

    //richiamno i riferimenti alla mappa e al suo contenitore per inizializzare la mappa
    mapRef.current = new mapboxgl.Map({
      // inserisco delle configurazioni per il container della mappa, lo stile,la posizione centrata e lo zoom
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: userLocation,
      zoom: 10,
    });

    new mapboxgl.Marker().setLngLat(userLocation).addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [userLocation]); //impostiamo la dipendenza con uselocation in modo che ogni volta che questo valore cambia la mappa viene reinizializzata

  //impostiamo un handle position che verra chiamata da un bottone per reindirizzare UI centrandola con la posizione dell'utente
  const handleResetposition = () => {
    //utilizzo flyTo nativo della libreria per reimpostare i parametri center e zoom e farlo con un animazione fluida
    mapRef.current.flyTo({
      center: userLocation,
      zoom: 15,
    });
  };

  return (
    <>
      {" "}
      {/* render condizionale della mappa basato sull'esistenza di userLocation  */}
      {userLocation ? (
        <div
          id="map-box"
          ref={mapContainerRef}
          style={{ width: "100%", height: "500px" }}
        />
      ) : (
        <p>Loading map...</p>
      )}
      <button className="map-reset-btm" onClick={handleResetposition}>
        Reset Position
      </button>
    </>
  );
}
