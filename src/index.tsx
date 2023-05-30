import React from "react";
import ReactDOM from "react-dom/client";
import "./Styles/index.css";
import RouteSwitch from "./Components/RouteSwitch";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./Firebase";

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouteSwitch />
  </React.StrictMode>
);
