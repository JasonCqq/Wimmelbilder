import React, { useState, useContext } from "react";
import "../Styles/Maps.css";
import image1 from "../Images/h4cxlfdfgiz81.webp";
import image2 from "../Images/MPiA9BqmrE56qHzJ7sufkth5iVh3xPycJvATWLx0tuE.webp";
import image3 from "../Images/zcg3gaz57tc31.webp";
import { GameContext } from "./App";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import InnerImageZoom from "react-inner-image-zoom";

interface MapsProps {
  map: string;
  updateGameStatus: () => void;
}

const Maps: React.FC<MapsProps> = ({ map, updateGameStatus }) => {
  const [image, setImage] = useState({
    name: "",
    timer: 0,
    character1: "",
    character2: "",
    character3: "",
  });

  const inGame = useContext(GameContext);

  const displayMap = (imgLink: string) => {
    return (
      <div className="gameOverlay">
        <div className="gameContainer">
          <div className="gameImage">
            {/* <img src={imgLink}></img> */}
            <InnerImageZoom
              src={imgLink}
              className="magnifierImg"
              zoomScale={1.3}
              zoomType="hover"
              hideHint={true}
            />
          </div>

          <div className="gameStats">
            <p>
              <strong>
                Timer <br></br> 1:00
              </strong>
            </p>
            <span>
              <div>
                <img src={image1}></img>
                <p>Not Found</p>
              </div>
              <div>
                <img src={image1}></img>
                <p>Not Found</p>
              </div>
              <div>
                <img src={image1}></img>
                <p>Not Found</p>
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
