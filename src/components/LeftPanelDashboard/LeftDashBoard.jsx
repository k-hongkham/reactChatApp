import React from "react";
import Channels from "./Channels";

const LeftDashBoard = () => {
  return (
    <div
      className="leftSideBarContainer flex-shrink-0 p-3 bg-white "
      style={{ width: "280px", border: "2px solid black" }}
    >
      <div className="position-sticky pt-3">
        <div className="d-flex flex-column p-3 bg-white">
          <ul className="list-unstyled ps-0">
            <li>ad6541654654d</li>
            <li>5asdfadsfadsfa</li>
            <li>87967498798789</li>
            <li>777</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeftDashBoard;
