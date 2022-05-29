import { createContext, useContext, useState } from "react";
import Cookies from "universal-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export const AuthProvider = ({ children }) => {
  // const [user, setUser] = useState(null);
  // const [espera, setEspera] = useState(null);
  // const [turn, setTurn] = useState(null);
  const cookie = new Cookies();

  const login = (user) => {
    // setUser(user);
    cookie.set("user", user, { path: "/" });
  };

  const logout = () => {
    cookie.remove("user", { path: "/" });
    cookie.remove("turno", { path: "/" });
    cookie.remove("espera", { path: "/" });
  };

  const setearEspera = (espera) => {
    // setEspera(espera);
    cookie.set("espera", espera, { path: "/" });
  };

  const setearTurno = (turno) => {
    // setTurn(turno);
    cookie.set("turno", turno, { path: "/" });
  };

  return (
    <AuthContext.Provider value={{ login, logout, setearEspera, setearTurno }}>
      {children}
    </AuthContext.Provider>
  );
};
