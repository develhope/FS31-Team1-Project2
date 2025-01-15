import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [userLogged, setUserLogged] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

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
    <UserContext.Provider value={{ login, logout, userLogged, isLogged, setIsLogged }}>
      {children}
    </UserContext.Provider>
  );
}
