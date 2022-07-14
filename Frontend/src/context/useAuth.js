import { createContext, useContext, useState } from "react";
import Cookies from "universal-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export const AuthProvider = ({ children }) => {
  const cookie = new Cookies();

  const login = (user) => {
    cookie.set("user", user, { path: "/" });
  };

  const logout = () => {
    cookie.remove("user", { path: "/" });
    cookie.remove("turno", { path: "/" });
    cookie.remove("espera", { path: "/" });
    cookie.remove("rol", { path: "/" });
  };

  const setearEspera = (espera) => {
    cookie.set("espera", espera, { path: "/" });
  };

  const setearTurno = (turno) => {
    cookie.set("turno", turno, { path: "/" });
  };

  const setRol = (rol) => {
    cookie.set("rol", rol, { path: "/" });
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, setearEspera, setearTurno, setRol }}
    >
      {children}
    </AuthContext.Provider>
  );
};
