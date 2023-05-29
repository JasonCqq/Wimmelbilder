import React, { useState, useContext, useEffect } from "react";
import "../Styles/Maps.css";
import image1 from "../Images/h4cxlfdfgiz81.webp";
import image2 from "../Images/mytedpt.jpg";
import image3 from "../Images/zcg3gaz57tc31.webp";
import { GameContext } from "./App";
import MagnifyComponent from "./Magnify";

interface MapsProps {
  map: string;
  updateGameStatus: () => void;
}

const Maps: React.FC<MapsProps> = ({ map, updateGameStatus }) => {
  const inGame = useContext(GameContext);
  // const [image, setImage] = useState({
  //   name: "",
  //   character1: "",
  //   character2: "",
  //   character3: "",
  // });
  const [timer, setTimer] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  //Add X/Y Coordinates to Div
  useEffect(() => {
    const gameDiv = document.querySelector(".magnifier");
    const mouseMove = (e: any) => {
      if (gameDiv && gameDiv.contains(e.target)) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };
    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  // Map timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    // Cleanup the interval when the component is unmounted
    return () => {
      clearInterval(interval);
    };
  }, []);

  //Shows popUp window
  const popUpWindow = () => {
    const gamePopUp = document.getElementById("gamePopUp");
    if (gamePopUp === null) {
      return;
    }
    if (gamePopUp?.style.display === "block") {
      gamePopUp.style.display = "none";
    } else {
      gamePopUp.style.display = "block";
      gamePopUp.style.left = mousePos.x.toString() + "px";
      gamePopUp.style.top = mousePos.y.toString() + "px";
      gamePopUp.style.position = "absolute";
    }
  };

  const displayMap = (imgLink: string) => {
    return (
      <div className="gameOverlay">
        <div className="gameContainer">
          <div
            className="gameImage"
            onClick={() => {
              popUpWindow();
            }}
          >
            {<MagnifyComponent map={imgLink} />}[{mousePos.x}, {mousePos.y}]{" "}
            <div id="gamePopUp">
              <p className="charSelect">Character 1</p>
              <p className="charSelect">Character 2</p>
              <p className="charSelect">Character 3</p>
            </div>
          </div>

          <div className="gameStats">
            <p>
              <strong>Time: {timer}s</strong>
            </p>
            <span>
              <div>
                <h5>Character 1</h5>
                <img src={image1}></img>
                <p>❌</p>
              </div>
              <div>
                <h5>Character 2</h5>
                <img src={image1}></img>
                <p>❌</p>
              </div>
              <div>
                <h5>Character 3</h5>
                <img src={image1}></img>
                <p>❌</p>
              </div>
            </span>
            <button
              onClick={() => {
                updateGameStatus();
              }}
            >
              Exit
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (map === "map1" && inGame) {
    // setImage({ ...image, name: "map1" });
    return displayMap(image1);
  } else if (map === "map2" && inGame) {
    // setImage({ ...image, name: "map2" });
    return displayMap(image2);
  } else if (map === "map3" && inGame) {
    // setImage({ ...image, name: "map3" });
    return displayMap(image3);
  } else {
    return null;
  }
};

export default Maps;
