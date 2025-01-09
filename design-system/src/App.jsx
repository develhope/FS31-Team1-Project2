import { MapContainer } from "react-leaflet";
import "./App.css";
import { NavbarUtente } from "./Home/NavbarUtente";
import { Post } from "./Home/Post";
import { MapComponent } from "./Map/MapComponet";
import { NavbarPulsanti } from "./Home/NavbarPulsanti";

function App() {
  return (
    <>
      <NavbarUtente />
      <Post />
      <NavbarPulsanti />
      <hr />
      <MapComponent />
      
    </>
  );
}

export default App;
