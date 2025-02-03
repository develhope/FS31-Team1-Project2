import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useNavigate } from "react-router-dom";

export function MapComponent(width) {
  //impostiamo i riferimenti per la manipolzione della mappa e per la gestione del suo conteniutore
  const mapRef = useRef();
  const mapContainerRef = useRef();

  //imposto lo useState della posizione del mio utente per gestirla in seguito all'interno dello useEffect e determinare quindi le coordinate dello user
  const [userLocation, setUserLocation] = useState(null);
  const [marker, setMarker] = useState(null); // Per tenere traccia del marker aggiunto
  const [distance, setDistance] = useState(null); // Stato per la distanza calcolata
  const [routeLayer, setRouteLayer] = useState(null); // Stato per il layer del percorso
  const [searchQuery, setSearchQuery] = useState(""); // Stato per la query di ricerca
  const [suggestions, setSuggestions] = useState([]); // Stato per memorizzare i suggerimenti

  const [destination, setDestination] = useState(null);
  const [searchQueryR, setSearchQueryR] = useState(""); // Stato per la query di ricerca
  const [markerR, setMarkerR] = useState(null); // Per tenere traccia del marker aggiunto
  const [suggestionsR, setSuggestionsR] = useState([]); // Stato per memorizzare i suggerimenti
  const navTo = useNavigate();

  useEffect(() => {
    //controllo l'esistenza di navigator.geolocation prima di andare a recuperare le informazioni delle coordinate
    if (navigator.geolocation) {
      //uso getcurrent position per ottenere i valori di latitudine e longitudine e li destrutturo partendo dal position.coords
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
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
    //controllo che userLocation esista prima di operare ulteriormente
    if (!userLocation) return;
    //impostiamo un valore a mapboxgl.accessToken per avere il riferimento al profilo utilizzato per la libreria
    mapboxgl.accessToken =
      "pk.eyJ1Ijoia2FyYXN1MDBnIiwiYSI6ImNtNmMxb2RjODBjNGQyanNjYWh2anl3aDYifQ.6Y73zxmEAj307vBJe-AmIw";
    //richiamno i riferimenti alla mappa e al suo contenitore per inizializzare la mappa
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: userLocation,
      zoom: 10,
      preserveDrawingBuffer: true,
    });
    // Aggiungo il marker alla mappa
    const userMarker = new mapboxgl.Marker()
      .setLngLat(userLocation)
      .addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [userLocation]); //impostiamo la dipendenza con userLocation in modo che ogni volta che questo valore cambia la mappa venga reinizializzata

  // Gestisce il click sulla mappa e posiziona un marker
  const handleMapClick = (e) => {
    const { lngLat } = e;

    // Rimuovo il marker esistente se esiste
    if (marker) {
      marker.remove();
    }

    // Creo un nuovo marker
    const newMarker = new mapboxgl.Marker()
      .setLngLat([lngLat.lng, lngLat.lat])
      .addTo(mapRef.current);

    setMarker(newMarker);

    // Rimuovo il percorso precedente, se esistente
    if (routeLayer) {
      mapRef.current.removeLayer(routeLayer.id);
      mapRef.current.removeSource(routeLayer.id);
    }

    // Aggiungo il calcolo del percorso appena dopo il click sulla mappa
    calculateRoute([lngLat.lng, lngLat.lat]);
  };

  // Funzione per calcolare la rotta
  const calculateRoute = async (destination) => {
    if (!userLocation || !destination) return; // mi assicuro che ci siano sia la posizione dell'utente che il marker

    const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${userLocation[0]},${userLocation[1]};${destination[0]},${destination[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0].geometry.coordinates;
        const distanceInMeters = data.routes[0].distance;
        const distanceInKilometers = (distanceInMeters / 1000).toFixed(2);

        setDistance(distanceInKilometers);

        // Rimuovo il percorso precedente se esistente
        if (routeLayer) {
          mapRef.current.removeLayer(routeLayer.id);
          mapRef.current.removeSource(routeLayer.id);
        }

        const newRouteLayer = {
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
        };
        // Aggiungi la rotta alla mappa
        mapRef.current.addLayer(newRouteLayer);
        setRouteLayer(newRouteLayer);
      }
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  };

  // Funzione per resettare la posizione sulla mappa (centrando sulla posizione dell'utente)
  const handleResetPosition = () => {
    if (userLocation) {
      mapRef.current.flyTo({
        center: userLocation,
        zoom: 15,
      });
    }
  };
  //Funzione di ritorno per cercare un luogo tramite il nome e ottenere i suggerimenti in tempo reale
  const handleSearchR = async () => {
    if (!searchQueryR) return;

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      searchQueryR
    )}.json?access_token=${mapboxgl.accessToken}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setSuggestionsR(data.features); // Salviamo i suggerimenti nel nostro stato

      const firstResult = data.features[0];

      if (firstResult) {
        const [longitude, latitude] = firstResult.center;
        // Centriamo la mappa sulla posizione trovata
        mapRef.current.flyTo({
          center: [longitude, latitude],
          zoom: 15,
        });

        // Rimuovo il marker precedente se esiste
        if (markerR) {
          markerR.remove();
        }

        // Creo un nuovo marker sulla posizione trovata
        const newMarker = new mapboxgl.Marker()
          .setLngLat([longitude, latitude])
          .addTo(mapRef.current);

        setMarkerR(newMarker);
        console.log("Chiamata a calculateRoute con:", [longitude, latitude]);
        // Calcolo il percorso verso la nuova posizione cercata
        setDestination([longitude, latitude]);
        calculateRoute(destination);
      } else {
        alert("No results found!");
      }
    } catch (error) {
      console.error("Error fetching geocoding data:", error);
    }
  };

  // Funzione per cercare un luogo tramite il nome e ottenere i suggerimenti in tempo reale
  const handleSearch = async () => {
    if (!searchQuery) return;

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      searchQuery
    )}.json?access_token=${mapboxgl.accessToken}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setSuggestions(data.features); // Salviamo i suggerimenti nel nostro stato

      const firstResult = data.features[0];

      if (firstResult) {
        const [longitude, latitude] = firstResult.center;
        // Centriamo la mappa sulla posizione trovata
        mapRef.current.flyTo({
          center: [longitude, latitude],
          zoom: 15,
        });

        // Rimuovo il marker precedente se esiste
        if (marker) {
          marker.remove();
        }

        // Creo un nuovo marker sulla posizione trovata
        const newMarker = new mapboxgl.Marker()

          .setLngLat([longitude, latitude])
          .addTo(mapRef.current);

        setMarker(newMarker);

        // Calcolo il percorso verso la nuova posizione cercata
        setUserLocation([longitude, latitude]);
        calculateRoute([longitude, latitude]);
      } else {
        alert("No results found!");
      }
    } catch (error) {
      console.error("Error fetching geocoding data:", error);
    }
  };

  // Funzione per gestire la selezione di un suggerimento dalla lista
  const handleSuggestionSelect = (suggestion) => {
    setSearchQuery(suggestion.place_name); // Impostiamo il nome del luogo nel campo di ricerca
    const [longitude, latitude] = suggestion.center;
    mapRef.current.flyTo({
      center: [longitude, latitude],
      zoom: 15,
    });

    // Aggiungiamo il marker
    if (marker) {
      marker.remove();
    }

    const newMarker = new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .addTo(mapRef.current);

    setMarker(newMarker);

    // Calcoliamo il percorso
    calculateRoute([longitude, latitude]);
  };

  const handleSuggestionSelectR = (suggestionR) => {
    setSearchQueryR(suggestionR.place_name); // Impostiamo il nome del luogo nel campo di ricerca
    const [longitude, latitude] = suggestionR.center;
    mapRef.current.flyTo({
      center: [longitude, latitude],
      zoom: 15,
    });

    // Aggiungiamo il marker
    if (markerR) {
      markerR.remove();
    }

    const newMarker = new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .addTo(mapRef.current);

    setMarkerR(newMarker);

    // Calcoliamo il percorso
    calculateRoute([longitude, latitude]);
  };

  const takeScreenshot = () => {
    if (mapRef.current) {
      const canvas = mapRef.current.getCanvas();
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        localStorage.setItem("mapScreenshotURL", url);
      }, "image/png");
    }
  };

  return {
    mapContainerRef,
    userLocation,
    marker,
    distance,
    searchQuery,
    setSearchQuery,
    suggestions,
    searchQueryR,
    setSearchQueryR,
    suggestionsR,
    markerR,
    handleSearchR,
    handleMapClick,
    handleSearch,
    handleResetPosition,
    takeScreenshot,
    handleSuggestionSelectR,
    handleSuggestionSelect,
  };
  // <>
  //   <div>
  //     <div className="search-location">
  //       <a className="link-class" onClick={() => navTo("/home")}>
  //         <svg
  //           width="20"
  //           height="20"
  //           viewBox="0 0 18 28"
  //           aria-hidden="true"
  //           xmlns="http://www.w3.org/2000/svg"
  //         >
  //           <path
  //             d="M1.825 28L18 14 1.825 0 0 1.715 14.196 14 0 26.285z"
  //             fill="currentColor"
  //           ></path>
  //         </svg>
  //       </a>
  //       <input
  //         type="text"
  //         placeholder="Cerca un luogo..."
  //         value={searchQuery}
  //         onChange={(e) => {
  //           setSearchQuery(e.target.value);
  //           handleSearch();
  //         }}
  //       />
  //       <button className="btn-search" onClick={handleSearch}>
  //         Cerca
  //       </button>
  //     </div>

  //     {/* Mostriamo i suggerimenti sotto il campo di ricerca */}
  //     {suggestions.length > 0 && (
  //       <ul className="suggestions-list">
  //         {suggestions.map((suggestion, index) => (
  //           <li
  //             key={index}
  //             onClick={() => handleSuggestionSelect(suggestion)}
  //           >
  //             {suggestion.place_name}
  //           </li>
  //         ))}
  //       </ul>
  //     )}
  //   </div>

  //   {userLocation ? (
  //     <div
  //       id="map-box"
  //       ref={mapContainerRef}
  //       style={{ width, height: "500px" }}
  //     />
  //   ) : (
  //     <p>Loading map...</p>
  //   )}

  //   <button className="map-reset-btm" onClick={handleResetPosition}>
  //     Reset Position
  //   </button>
  //   <button
  //     className="map-add-marker-btm"
  //     onClick={() => mapRef.current.on("click", handleMapClick)}
  //   >
  //     Add Marker
  //   </button>
  //   <button onClick={takeScreenshot}>create screenshot</button>

  //   {distance && (
  //     <div>
  //       <p>Distance: {distance} km</p>
  //     </div>
  //   )}
  // </>
}
