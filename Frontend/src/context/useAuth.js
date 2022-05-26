import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [espera, setEspera] = useState(null);
  const [turn, setTurn] = useState(null);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  const setearEspera = (espera) => {
    setEspera(espera);
  };

  const setearTurno = (turno) => {
    setTurn(turno);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, espera, turn, setearEspera, setearTurno }}
    >
      {children}
    </AuthContext.Provider>
  );
};
