import React, { createContext, useState } from "react";
import firebase from "firebase";
import { login, logout } from "../firebase/firebaseFunctions";
export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        hasCameraPermission,
        setHasCameraPermission,
        login: login,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
