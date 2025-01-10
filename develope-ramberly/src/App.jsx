import "./App.css";
import { Login } from "./componenti/Login";
import { UserProvider } from "./contesti/useContext";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Registrazione } from './componenti/Registrazione';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/registrazione" element={<Registrazione />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
