import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import persone from "../database";

export const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [userLogged, setUserLogged] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [pers, setPers] = useState(persone);

  // da 17 a 24 è stato wrappato con uno useEffect che esegue il setItem di users solo una volta al richiamo del contesto, altrimenti si crea un loop.

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(pers));

    const users = localStorage.getItem("users");
    const parseUsers = JSON.parse(users);

    setPers((pre) => [...pre, parseUsers]);
    localStorage.setItem("users", JSON.stringify(pers));
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setUserLogged(JSON.parse(data));
    }
  }, [isLogged]);

  const login = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUserLogged(user);
    setIsLogged(true);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUserLogged(null);
    setIsLogged(false);
  };

  return (
    <UserContext.Provider
      value={{ login, logout, userLogged, isLogged, setIsLogged }}
    >
      {children}
    </UserContext.Provider>
  );
}
