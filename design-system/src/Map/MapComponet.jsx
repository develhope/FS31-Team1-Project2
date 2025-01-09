import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"; //hook per ottenere l'istanza mappa("useMap"), con componenti nativi di 'react-leaflet'
import "leaflet/dist/leaflet.css";
import L from "leaflet"; //libreria principale per la gestione delle mappe
import "leaflet-routing-machine"; //estensione di "leaflet" per calcolare i percorsi

// 📍 Componente RoutingMachine per calcolare il percorso tra la posizione corrente e quella target
const RoutingMachine = ({ currentPosition, targetPosition }) => {
  const map = useMap(); // Ottiene l'istanza della mappa

  useEffect(() => {
    if (!currentPosition || !targetPosition) {
      return; // Se una delle posizioni non è definita, non esegue nulla
    }

    //Crea un controllo di routing (percorso) sulla mappa
    const routingControl = L.Routing.control({
      //imposto i valori per il punto di partenza e di arrivo
      waypoints: [
        L.latLng(currentPosition[0], currentPosition[1]),
        L.latLng(targetPosition[0], targetPosition[1]),
      ],

      //imposto profilo "foot" per ottimizzare i percorsi di tipo pedonale
      router: L.Routing.osrmv1({ profile: "foot" }),

      //utilizzo 'styles' per personalizzare la linea del percorso impostato con colore e spessore
      styles: [{ color: "#6FA1EC", weight: 4 }],
      //imposto 'routewhiledragging' a 'true' cosi il percorso si aggiornerà  se l'utente trascina i marker
      routeWhileDragging: true,
    }).addTo(map); //uso 'addTo' seguito dalla costante 'map' cosi da agganciare le proprietà appena impostate alla mappa

    return () => map.removeControl(routingControl); //rimuoviamo il controllo della mappa allo smonto del componente
  }, [map, currentPosition, targetPosition]); //imposto le costanti all'interno dell'array di dipendenze che determinano l'esecuzione dello useEffect

  return null; // Il componente non renderizza nulla direttamente
};

// 📍 Componente Principale della Mappa
export function MapComponent() {
  const [currentPosition, setCurrentPosition] = useState(null); // Stato per la posizione corrente dell'utente
  const [targetPosition, setTargetPosition] = useState(null); // Stato per la posizione target impostata dall'utente

  //use "useEffect" per trovare la posizione dell'utente al render del componente
  useEffect(() => {
    if (navigator.geolocation) {
      //uso "navigator" per ottenere la latitudine e la longitudine dell'utente e le destrutturo in constanti che fanno riferimento a "position.coords"
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        //imposto la posizione corrente come un array con al suo interno due elementi che corrispondono ai valori di latitudine e longitudine appena ottenuti
        setCurrentPosition([latitude, longitude]);
      });
    }
  }, []);

  //imposto funzione 'handleMapClick' per gestire il settaggio del target da parte dell'utente
  const handleMapClick = (e) => {
    console.log("Mappa cliccata", e.latlng); // Aggiungi un log per vedere le coordinate
    setTargetPosition([e.latlng.lat, e.latlng.lng]);
  };

  if (!currentPosition) {
    return <div>Loading...</div>; // Mostra un caricamento finché non ottieni la posizione dell'utente
  }
  return (
    <div className="map-container">
      {/* richiamo <MapContainer> per renderizzare il contenitore principale della mappa */}
      {currentPosition && (
        <MapContainer
          center={currentPosition} //imposto center a 'currentPosition' per centrare la mappa con la posizione dell'utente
          zoom={10} //imposto lo zoom a 10 per rendere piu comprensibile la mappa già in partenza
          className="map"
          whenCreated={(map) => {
            map.on("click", handleMapClick); //imposto onclick al componente con riferimento alla variabile 'map' richiamando la funzione che gestisce il set della destinazione
          }}
        >
          {/* richiamo <TileLayer> per aggiungere il livello visivo alla mappa */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" //impostiamo l'URL di riferimento per il livello visivo OpenStreetMap API
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' // andiamo ad impostare attribution per rendere credito a OpenStreetMap della mappa
          />

          {/* richiamo i <marker> per la posizione corrente dell'utente e quella della destinazione impostata */}
          <Marker
            position={currentPosition} //impostiamo la posizione con quella corrente dell'utente per centrare la mappa
          >
            {/* aggiungiamo componente <popup> per maggior leggibilità sulla mappa */}
            <Popup>You're Here</Popup>
          </Marker>

          {/* richiamo secondo marker per gestione destinazione impostata dell'utente e visibile solo se targetPosition esiste*/}
          {targetPosition && (
            <Marker position={targetPosition}>
              <Popup>Your Destination</Popup>
            </Marker>
          )}

          {/* richiamo <RoutingMachine> per gestire il calcolo e la visualizzazione del percorso */}
          {targetPosition && (
            <RoutingMachine
              currentPosition={currentPosition}
              targetPosition={targetPosition}
            />
          )}
        </MapContainer>
      )}
    </div>
  );
}
