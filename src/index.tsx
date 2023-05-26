import React from "react";
import ReactDOM from "react-dom/client";
import "./Styles/index.css";
import RouteSwitch from "./Components/RouteSwitch";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouteSwitch />
  </React.StrictMode>
);
