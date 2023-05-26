import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Nav from "./Nav";
import Leaderboard from "./Leaderboard";
import React from "react";

const RouteSwitch = () => {
  return (
    <HashRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/leaderboard" element={<Leaderboard />}></Route>
      </Routes>
    </HashRouter>
  );
};

export default RouteSwitch;
