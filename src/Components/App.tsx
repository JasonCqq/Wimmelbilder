import React, { createContext, useEffect, useState } from "react";
import "../Styles/App.css";
import "firebase/firestore";
import image1 from "../Images/h4cxlfdfgiz81.webp";
import image2 from "../Images/mytedpt.jpg";
import image3 from "../Images/zcg3gaz57tc31.webp";
import Maps from "./Maps";

const GameContext = createContext<boolean>(false);
const App = () => {
  const [currentMap, setCurrentMap] = useState("");
  const [inGame, setInGame] = useState(false);

  //change game status to inactive
  const backButtonFunction = () => {
    setCurrentMap("");
    setInGame(false);
  };

  //change game status to active and disable scrolling
  useEffect(() => {
    setInGame(true);
    inGame === true
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [currentMap]);

  return (
    <GameContext.Provider value={inGame}>
      <div className="App">
        <header id="header">
          <h1>WimmelBilder Game</h1>
          <span>
            <h5 className="features">
              Magnifier • Leaderboard • Authentication
            </h5>
            <h5>Find the characters in each image as fast as possible!</h5>
            <h5>
              <strong>Sign In</strong> to save scores and be on the leaderboard!
            </h5>
          </span>
        </header>

        <div id="maps">
          <h4>Current Maps</h4>
          <p style={{ textAlign: "center" }}>
            * Please reach me through github to take down images or upload an
            image{" "}
          </p>
          <div className="grid-container">
            <div className="map">
              <img src={image1}></img>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.reddit.com/r/wimmelbilder/comments/upqzzy/pokemon_tropical_drawing/"
              >
                Map #1 - Artist
              </a>
              <span>
                <p>Difficulty: ★★★</p>
                <button onClick={() => setCurrentMap("map1")}>Play</button>
              </span>
            </div>
            <div className="map">
              <img src={image2}></img>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.reddit.com/r/wimmelbilder/comments/i1dry4/wheres_pandaman_took_71_hours_can_you_find_all_5/"
              >
                Map #2 - Artist
              </a>
              <span>
                <p>Difficulty: ★★★★</p>
                <button onClick={() => setCurrentMap("map2")}>Play</button>
              </span>
            </div>
            <div className="map">
              <img src={image3}></img>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.reddit.com/r/wimmelbilder/comments/cif7jo/meme_supreme_by_me/"
              >
                Map #3 - Artist
              </a>
              <span>
                <p>Difficulty: ★★★</p>
                <button onClick={() => setCurrentMap("map3")}>Play</button>
              </span>
            </div>
          </div>
        </div>

        <div>
          {currentMap && (
            <Maps map={currentMap} updateGameStatus={backButtonFunction} />
          )}
        </div>
        <p style={{ textAlign: "center" }}>
          (More characters to be added soon!)
        </p>

        <footer>
          <p>
            Created by Jason -{" "}
            <a
              href="https://github.com/jason21715/Wimmelbilder"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </p>
        </footer>
      </div>
    </GameContext.Provider>
  );
};

export default App;
export { GameContext };
