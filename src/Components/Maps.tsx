import React, { useState, useContext, useEffect, useRef } from "react";
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
  //game status, in game/ not in game
  const inGame = useContext(GameContext);
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
    popUpX: 0,
    popUpY: 0,
  });

  const [position, setPosition] = useState([
    //Spiderman
    {
      character: "Character1",
      x: 297,
      x2: 350,
      y: 613,
      y2: 706,
      found: false,
    },
    //Mario
    {
      character: "Character2",
      x: 53,
      x2: 99,
      y: 463,
      y2: 540,
      found: false,
    },
    //Yoshi
    {
      character: "Character3",
      x: 155,
      x2: 200,
      y: 121,
      y2: 187,
      found: false,
    },
  ]);
  const positionFound = useRef(0);
  const timer = useRef(0);

  //Add X/Y Coordinates to Div
  useEffect(() => {
    const gameDiv = document.querySelector(".magnifier");
    //Screen Width / clientX
    const mouseMove = (event: any) => {
      if (gameDiv && gameDiv.contains(event.target)) {
        setMousePos({
          x:
            ((event.clientX - gameDiv.getBoundingClientRect().left) /
              window.innerWidth) *
            1000,
          y:
            ((event.clientY - gameDiv.getBoundingClientRect().top) /
              window.innerHeight) *
            1000,
          popUpX: event.clientX - 5,
          popUpY: event.clientY - 5,
        });
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
      timer.current = timer.current + 1;
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
      gamePopUp.style.left = mousePos.popUpX.toString() + "px";
      gamePopUp.style.top = mousePos.popUpY.toString() + "px";
      gamePopUp.style.position = "absolute";
      gamePopUp.style.zIndex = "98";
    }
  };

  const popUpCharacterSelect = (e: any) => {
    const character = e.currentTarget.innerText.split(" ").join("");
    const gameStatsDiv = document.querySelector(".gameStats");

    //match characters
    for (const key of position) {
      if (key.character !== character) {
        continue;
      }
      if (
        mousePos.x > key.x &&
        mousePos.x < key.x2 &&
        mousePos.y > key.y &&
        mousePos.y < key.y2
      ) {
        //Finds the correct div, and sets to found
        const characterDiv = gameStatsDiv?.querySelector(
          `.${key.character}`
        ) as HTMLElement;
        if (characterDiv !== undefined && characterDiv !== null) {
          characterDiv.textContent = "✓";
          characterDiv.style.color = "green";
        }

        positionFound.current = positionFound.current + 1;
        setPosition((prevPosition) =>
          prevPosition.map((pos) => {
            if (pos.character === key.character) {
              return { ...pos, found: true };
            }
            return pos;
          })
        );
      }
    }
  };

  const submitScoreWindow = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return (
      <div id="submitScoreWindow">
        <h1>Congratulations!</h1>
        <p>Name: Guest</p>
        <p>Map: {map}</p>
        <p>
          Score: {timer.current} Date: {month}/{day}/{year}
        </p>
        <button>Submit Score</button>
      </div>
    );
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
            {positionFound.current === position.length ? (
              submitScoreWindow()
            ) : (
              <MagnifyComponent map={imgLink} />
            )}
            <div id="gamePopUp">
              <p
                onClick={(e) => popUpCharacterSelect(e)}
                className="charSelect"
              >
                Character 1
              </p>
              <p
                onClick={(e) => popUpCharacterSelect(e)}
                className="charSelect"
              >
                Character 2
              </p>
              <p
                onClick={(e) => popUpCharacterSelect(e)}
                className="charSelect"
              >
                Character 3
              </p>
            </div>
          </div>
          <div className="gameStats">
            <p>
              <strong>Time: {timer.current}s</strong>
            </p>
            <span>
              <div>
                <h5>Character 1</h5>
                <img src={image1}></img>
                <p className="Character1">❌</p>
              </div>
              <div>
                <h5>Character 2</h5>
                <img src={image1}></img>
                <p className="Character2">❌</p>
              </div>
              <div>
                <h5>Character 3</h5>
                <img src={image1}></img>
                <p className="Character3">❌</p>
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
        <span className="mouseCoords">
          [X:{Math.floor(mousePos.x)}, Y:{Math.floor(mousePos.y)}]
        </span>
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
