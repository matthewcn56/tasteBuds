import React from "react";
import { AuthProvider } from "./AuthProvider";
import NavigationStack from "./NavigationStack";
export default function Providers() {
  return (
    <AuthProvider>
      <NavigationStack />
    </AuthProvider>
  );
}
