import React, { createContext } from "react";
import firebase from "firebase";
import { login, logout } from "../firebase/firebaseFunctions";
import { useState } from "react";
export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: login,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
