import React from "react";
import Channels from "./Channels";

const LeftDashBoard = () => {
  return (
    <div className="leftSideBarContainer col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="position-sticky pt-3">
        <div className="d-flex flex-column p-3 bg-white">
          <ul className="list-unstyled ps-0"></ul>
        </div>
      </div>
    </div>
  );
};

export default LeftDashBoard;
