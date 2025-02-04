import "./App.css";
import { Login } from "./componenti/Login";
import { UserProvider } from "./contesti/useContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Registrazione } from "./componenti/Registrazione";
import { Caratteristiche } from "./componenti/Caratteristiche";
import { ScegliAvatar } from "./componenti/ScegliAvatar";
import { PotrestiConoscere } from "./componenti/PotrestiConoscere";
import { Home } from "./componenti/Home";
import ScegliSport from "./componenti/ScegliSport";
import { CreaEvento } from "./componenti/CreaEvento";
import { EventiPreferiti } from "./componenti/EventiPreferiti";
import { MapComponent } from "./componenti/MapComponent";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrazione" element={<Registrazione />} />
          <Route path="/caratteristiche" element={<Caratteristiche />} />
          <Route path="/scegliavatar" element={<ScegliAvatar />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sceglieresport" element={<ScegliSport />} />
          <Route path="/potresticonoscere" element={<PotrestiConoscere />} />
          <Route path="/creaevento" element={<CreaEvento />} />
          <Route path="/eventipreferiti" element={<EventiPreferiti />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
