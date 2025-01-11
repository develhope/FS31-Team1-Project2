import "./App.css";
import { Login } from "./componenti/Login";
import { UserProvider } from "./contesti/useContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Registrazione } from "./componenti/Registrazione";
import { Caratteristiche } from "./componenti/Caratteristiche";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrazione" element={<Registrazione />} />
          <Route path="/caratteristiche" element={<Caratteristiche />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
