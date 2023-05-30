import React, { useState, useContext, useEffect, useRef } from "react";
import "../Styles/Maps.css";
import image1 from "../Images/h4cxlfdfgiz81.webp";
import image2 from "../Images/mytedpt.jpg";
import image3 from "../Images/zcg3gaz57tc31.webp";
import { GameContext } from "./App";
import MagnifyComponent from "./Magnify";
import {
  getFirestore,
  app,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  addDoc,
  collection,
  collectionGroup,
  query,
  where,
} from "../Firebase";
import { getAuth, onAuthStateChanged } from "../Firebase";
import uniqid from "uniqid";

interface MapsProps {
  map: string;
  updateGameStatus: () => void;
}

const Maps: React.FC<MapsProps> = ({ map, updateGameStatus }) => {
  const [uid, setUID] = useState("");
  const allMaps = ["map1", "map2", "map3"];

  //Load character data
  async function receiveData(mapNumber: string) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUID(user.uid);
      }
    });

    const db = getFirestore(app);
    const dbRef = doc(db, "maps", `${mapNumber}`);
    const dbSnap = await getDoc(dbRef);
    if (dbSnap.exists()) {
      const data = dbSnap.data();
      const newData = Object.values(data).map((item: any) => ({
        character: item.character,
        x: item.x,
        x2: item.x2,
        y: item.y,
        y2: item.y2,
        found: item.found,
        imageLink: item.imageLink,
        name: item.name,
      }));
      setPosition(newData);
    } else {
      console.log("ERROR");
    }
  }
  useEffect(() => {
    receiveData(map);
  }, []);

  //game status, in game/ not in game
  const inGame = useContext(GameContext);
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
    popUpX: 0,
    popUpY: 0,
  });

  const [position, setPosition] = useState([
    {
      character: "",
      x: 0,
      x2: 0,
      y: 0,
      y2: 0,
      found: false,
      imageLink: "",
      name: "",
    },
  ]);
  const positionFound = useRef(0);
  const timer = useRef(0);

  //Add Calculated X/Y Coordinates to Div
  useEffect(() => {
    const gameDiv = document.querySelector(".magnifier");
    //Screen Width / clientX | Screen Height / clientY
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
    // Clear the interval when the component is unmounted
    return () => {
      clearInterval(interval);
    };
  }, []);

  //Shows pop up character select window
  const popUpWindow = () => {
    const gamePopUp = document.getElementById("gamePopUp");
    if (gamePopUp === null || positionFound.current === position.length) {
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

  //Check if correct character clicked on correct coords.
  const popUpCharacterSelect = (e: any) => {
    const character = e.currentTarget.innerText.split(" ").join("");
    //match characters
    for (const key of position) {
      if (key.character !== character) {
        continue;
      }
      if (
        mousePos.x >= key.x &&
        mousePos.x <= key.x2 &&
        mousePos.y >= key.y &&
        mousePos.y <= key.y2
      ) {
        //Update found state
        setPosition((prevPosition) =>
          prevPosition.map((pos) => {
            if (pos.character === key.character && pos.found !== true) {
              positionFound.current = positionFound.current + 1;
              return { ...pos, found: true };
            }
            return pos;
          })
        );

        //Add marks when found on screen.
        const charMark = document.querySelector(
          `.charMark${positionFound.current}`
        ) as HTMLElement;
        charMark.style.top = `${mousePos.popUpY - 25}px`;
        charMark.style.left = `${mousePos.popUpX - 25}px`;
        charMark.style.display = "block";
      }
    }
  };

  const submitScoreWindow = () => {
    //Removes marks and popups when game is finished
    const charMarks = Array.from(
      document.getElementsByClassName(
        "charMark"
      ) as HTMLCollectionOf<HTMLElement>
    );
    for (const i of charMarks) {
      i.style.display = "none";
    }
    const gamePopUp = document.getElementById("gamePopUp");
    if (gamePopUp !== null) {
      gamePopUp.style.display = "none";
    }

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const currentUserData = getAuth().currentUser;

    const submitFunction = async () => {
      if (!uid) {
        return;
      }

      console.log("test");

      const db = getFirestore(app);
      const userDocsRef = doc(db, "users", uid);
      const scoresRef = collection(userDocsRef, "scores");
      const scoresSnapshot = await getDocs(scoresRef);

      let scoreExists = false;

      for (const doc of scoresSnapshot.docs) {
        const scoreData = doc.data();
        if (scoreData.map === map) {
          scoreExists = true;
          await setDoc(doc.ref, {
            date: `${month}/${day}/${year}`,
            map: map,
            name: currentUserData
              ? currentUserData.displayName?.split(" ")[0]
              : "",
            score: timer.current,
            uid: uid,
          });
        }
      }

      if (!scoreExists) {
        await addDoc(collection(userDocsRef, "scores"), {
          date: `${month}/${day}/${year}`,
          map: map,
          name: currentUserData
            ? currentUserData.displayName?.split(" ")[0]
            : "",
          score: timer.current,
          uid: uid,
        });
      }
    };

    return (
      <div id="submitScoreWindow">
        <h1>Congratulations!</h1>
        <p>
          Name:{" "}
          {currentUserData
            ? currentUserData.displayName?.split(" ")[0]
            : "Guest"}
        </p>
        <p>Map: {map}</p>
        <p>
          Score: {timer.current} Date: {month}/{day}/{year}
        </p>
        <button
          id="submitScoreButton"
          onClick={() => {
            submitFunction();
          }}
        >
          Submit Score
        </button>
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
            <div className="charMark1 charMark"></div>
            <div className="charMark2 charMark"></div>
            <div className="charMark3 charMark"></div>

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

            <span className="characterSpan">
              {position.map((pos) => {
                return (
                  <div key={uniqid()}>
                    <h5>{pos.name}</h5>
                    <img src={pos.imageLink}></img>
                    <p className={pos.character + (pos.found ? " green" : "")}>
                      {pos.found === false ? "❌" : "✓"}
                    </p>
                  </div>
                );
              })}
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
    return displayMap(image1);
  } else if (map === "map2" && inGame) {
    return displayMap(image2);
  } else if (map === "map3" && inGame) {
    return displayMap(image3);
  } else {
    return null;
  }
};
export default Maps;
