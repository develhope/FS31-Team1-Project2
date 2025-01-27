import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export function MapComponent() {
  // Riferimenti per la mappa e il contenitore della mappa
  const mapRef = useRef();
  const mapContainerRef = useRef();
  
  // Stato per la posizione dell'utente, per il marker e per la distanza
  const [userLocation, setUserLocation] = useState(null);
  const [marker, setMarker] = useState(null);  // Per tenere traccia del marker aggiunto
  const [distance, setDistance] = useState(null);  // Stato per la distanza calcolata

  // Funzione per calcolare la rotta
  const calculateRoute = async () => {
    if (!userLocation || !marker) return;

    const markerCoordinates = marker.getLngLat(); // Otteniamo le coordinate del marker
    const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${userLocation[0]},${userLocation[1]};${markerCoordinates.lng},${markerCoordinates.lat}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0].geometry.coordinates;
        const distanceInMeters = data.routes[0].distance; // La distanza è in metri
        const distanceInKilometers = (distanceInMeters / 1000).toFixed(2); // Convertiamo in km

        // Impostiamo la distanza nello stato
        setDistance(distanceInKilometers);

        // Aggiungi il percorso alla mappa come linea
        if (mapRef.current.getLayer('route')) {
          mapRef.current.removeLayer('route'); // Rimuovi il percorso precedente
          mapRef.current.removeSource('route'); // Rimuovi la fonte precedente
        }

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

  useEffect(() => {
    // Controllo la geolocalizzazione e ottengo la posizione dell'utente
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([longitude, latitude]);
        },
        (error) => {
          console.error("Error fetching location:", error.message);
          setUserLocation([-74.006, 40.7128]); // Usa una posizione di fallback (New York)
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
      setUserLocation([-74.006, 40.7128]); // Usa una posizione di fallback
    }
  }, []);

  useEffect(() => {
    if (!userLocation) return;

    // Inizializzo la mappa
    mapboxgl.accessToken =
      "pk.eyJ1Ijoia2FyYXN1MDBnIiwiYSI6ImNtNmMxb2RjODBjNGQyanNjYWh2anl3aDYifQ.6Y73zxmEAj307vBJe-AmIw"; // Token di Mapbox

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: userLocation,
      zoom: 10,
    });

    // Aggiungo il marker per la posizione dell'utente
    const userMarker = new mapboxgl.Marker()
      .setLngLat(userLocation)
      .addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [userLocation]);

  // Gestisce il click sulla mappa e posiziona un marker
  const handleMapClick = (e) => {
    const { lngLat } = e;

    // Rimuovo il marker esistente se presente
    if (marker) {
      marker.remove();
    }

    // Creo un nuovo marker
    const newMarker = new mapboxgl.Marker()
      .setLngLat([lngLat.lng, lngLat.lat])
      .addTo(mapRef.current);

    // Imposto il nuovo marker nello stato
    setMarker(newMarker);
  };

  // Funzione per resettare la posizione sulla mappa (centrando sulla posizione dell'utente)
  const handleResetPosition = () => {
    mapRef.current.flyTo({
      center: userLocation,
      zoom: 15,
    });
  };

  // Funzione per aggiungere il marker tramite il click (dal tasto "Add with Click Marker")
  const handleAddWithClickMarker = () => {
    if (mapRef.current) {
      // Attiva il listener per il click sulla mappa
      mapRef.current.on("click", handleMapClick);
    }
  };

  return (
    <>
      {/* Condizione per mostrare la mappa solo quando userLocation è disponibile */}
      {userLocation ? (
        <div
          id="map-box"
          ref={mapContainerRef}
          style={{ width: "500px", height: "500px" }}
        />
      ) : (
        <p>Loading map...</p>
      )}

      {/* Pulsanti per la mappa */}
      <button className="map-reset-btm" onClick={handleResetPosition}>
        Reset Position
      </button>
      <button onClick={handleAddWithClickMarker}>
        Add with Click Marker
      </button>
      <button onClick={calculateRoute}>Calculate Route</button>

      {/* Visualizza la distanza calcolata */}
      {distance && (
        <div>
          <p>Distance: {distance} km</p>
        </div>
      )}
    </>
  );
}
