// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Magnifier from "react-magnifier";
import React from "react";

export default function MagnifyComponent(map: prop) {
  return (
    <Magnifier
      src={map.map}
      mgShape="square"
      zoomFactor={2}
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
