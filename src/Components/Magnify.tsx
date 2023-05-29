// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Magnifier from "react-magnifier";
import React, { useEffect, useState } from "react";

export default function MagnifyComponent(map: prop) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const test = document.getElementById("magnifierMagnifier");
    // const test2 = document.querySelector(".magnifier");
    // test2.style.width = `${test.offsetWidth.toString()}px"`;
    setOffset(test?.parentElement?.offsetWidth);
  }, []);

  return (
    <Magnifier
      src={map.map}
      mgShape="square"
      zoomFactor={3}
      mgWidth={75}
      mgHeight={75}
      mgTouchOffsetX={0}
      mgTouchOffsetY={0}
      mgMouseOffsetX={0}
      mgMouseOffsetY={0}
      id="magnifierMagnifier"
    />
  );
}
