import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [userLogged, setUserLogged] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setUserLogged(JSON.parse(data));
    }
  }, []);

  const login = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUserLogged(user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUserLogged(null);
  };

  return (
    <UserContext.Provider value={{ login, logout, userLogged }}>
      {children}
    </UserContext.Provider>
  );
}
