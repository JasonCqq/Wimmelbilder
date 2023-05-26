import React from "react";
import "../Styles/App.css";
import "firebase/firestore";
import image1 from "../Images/h4cxlfdfgiz81.webp";
import image2 from "../Images/MPiA9BqmrE56qHzJ7sufkth5iVh3xPycJvATWLx0tuE.webp";
import image3 from "../Images/zcg3gaz57tc31.webp";

const App = () => {
  return (
    <div className="App">
      <header id="header">
        <h1>WimmelBilder Game</h1>
        <h5>Find the images as fast as possible!</h5>
        <h4>
          <u>Sign In</u> to save scores and be on the leaderboard!
        </h4>
        <button className="playButton">PLAY</button>
      </header>

      <div id="maps">
        <h4>Current Maps</h4>
        <div className="grid-container">
          <div className="map">
            <img src={image1}></img>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.reddit.com/r/wimmelbilder/comments/upqzzy/pokemon_tropical_drawing/"
            >
              -Artist-
            </a>
          </div>

          <div className="map">
            <img src={image2}></img>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.reddit.com/r/wimmelbilder/comments/i1dry4/wheres_pandaman_took_71_hours_can_you_find_all_5/"
            >
              -Artist-
            </a>
          </div>

          <div className="map">
            <img src={image3}></img>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.reddit.com/r/wimmelbilder/comments/cif7jo/meme_supreme_by_me/"
            >
              -Artist-
            </a>
          </div>
        </div>
      </div>

      <footer>
        <p>
          Code by Jason -{" "}
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
  );
};

export default App;
