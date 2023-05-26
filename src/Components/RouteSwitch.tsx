import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import React from "react";

const RouteSwitch = () =>{
    return(
        <HashRouter>
            <Routes>
                <Route path="/" element={<App/>}></Route>
            </Routes>
        </HashRouter>
    )
}

export default RouteSwitch