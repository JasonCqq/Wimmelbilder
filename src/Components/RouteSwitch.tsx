import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Nav from "./Nav";
import Leaderboard from "./Leaderboard";
import React from "react";
import Maps from "./Maps";

const RouteSwitch = () => {
  return (
    <HashRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/leaderboard" element={<Leaderboard />}></Route>
        <Route path="/maps" element={<Maps />}></Route>
      </Routes>
    </HashRouter>
  );
};

export default RouteSwitch;
