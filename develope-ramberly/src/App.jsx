import "./App.css";
import { Login } from "./componenti/Login";
import { UserProvider } from "./contesti/useContext";

function App() {
  return (
    <UserProvider>
      <Login />
      
    </UserProvider>
  );
}

export default App;
