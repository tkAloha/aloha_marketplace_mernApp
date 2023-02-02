import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./context/AuthContext";
import { ProSidebarProvider } from "react-pro-sidebar";
import { UserContextProvider } from "./context/UserContext";
import { ProfileContextProvider } from "./context/ProfileContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <ProSidebarProvider>
    <AuthContextProvider>
      <UserContextProvider>
      <ProfileContextProvider>
        <App />
        </ProfileContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
    </ProSidebarProvider>
  </React.StrictMode>
);

reportWebVitals();
