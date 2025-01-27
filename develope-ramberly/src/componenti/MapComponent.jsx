import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export function MapComponent() {
  //impostiamo i riferimenti per la manipolzione della mappa e per la gestione del suo conteniutore
  const mapRef = useRef();
  const mapContainerRef = useRef();
  //imposto lo useState della posizione del mio utente per gestirla in seguito all'interno dello useEffetct e determinare quindi le coordinate dello user
  const [userLocation, setUserLocation] = useState(null);

  //M: Aggiunto romecoordinates per capire come viene aggiunto un secondo marker
  const romeCoordinates = [12.4964, 41.9028];

  useEffect(() => {
    //controllo l'esistenza di navigator.geolocation prima di andare a recuperare le informazioni delle coordinate
    if (navigator.geolocation) {
      //uso getcurrent position per ottenere i valo ri di latitudine e longitudine e li destrutturo partendo dal position.coords
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

    // Aggiungo il marker alla mappa
    const marker = new mapboxgl.Marker()
      .setLngLat(userLocation) // Coordinate del marker
      .addTo(mapRef.current); // Aggiungo alla mappa

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

  //M: Funzione per creare un nuovo Marker
  const handleAddMarker = () => {
    if (mapRef.current) {
      new mapboxgl.Marker()
        .setLngLat(romeCoordinates) // Posiziona il marker al centro attuale della mappa
        .addTo(mapRef.current);
    }
  };

  //M: Funzione asincrona per calcolare la rotta tra userlocation e romecoordinates
  const calculateRoute = async () => {
    if (!userLocation || !romeCoordinates) return;

    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation[0]},${userLocation[1]};${romeCoordinates[0]},${romeCoordinates[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0].geometry.coordinates;

        // Aggiungi il percorso alla mappa come linea
        mapRef.current.addLayer({
          id: "route", // Identificativo unico per il layer della linea
          type: "line", // Tipo di layer: in questo caso una linea per rappresentare il percorso
          source: {
            type: "geojson", // Tipo di sorgente: formato GeoJSON per rappresentare i dati geografici
            data: {
              type: "Feature", // Specifica che stiamo usando una "feature" GeoJSON
              properties: {}, // Proprietà opzionali della feature (può essere usato per metadati)
              geometry: {
                type: "LineString", // Tipo di geometria: una linea con coordinate connesse
                coordinates: route, // Coordinate del percorso ottenute dalla Directions API
              },
            },
          },
          layout: {
            "line-join": "round", // Unisce i segmenti della linea con angoli arrotondati
            "line-cap": "round", // Termina le estremità della linea in modo arrotondato
          },
          paint: {
            "line-color": "#ff0000", // Colore della linea: rosso (#ff0000)
            "line-width": 4, // Spessore della linea in pixel
          },
        });
      }
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  };

  return (
    <>
      {" "}
      {/* render condizionale della mappa basato sull'esistenza di userLocation  */}
      {userLocation ? (
        <div
          id="map-box"
          ref={mapContainerRef}
          style={{ width: "2000px", height: "500px" }}
        />
      ) : (
        <p>Loading map...</p>
      )}
      <button className="map-reset-btm" onClick={handleResetposition}>
        Reset Position
      </button>
      <button className="map-add-marker-btm" onClick={handleAddMarker}>
        Add Marker
      </button>
      <button onClick={calculateRoute}>Calculate Route</button>
    </>
  );
}
/*M: Aggiunti pulsanti per aggiungere marker, per ora alla romacoordinates,
      e calcolare la rotta */