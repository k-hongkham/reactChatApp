import React, { useEffect } from "react";
import LogOutBtn from "../Login/LogOutBtn";
import Channels from "./Channels";
import useAuth from "../hooks/useAuth";
import { getMe } from "../../axios";

const LeftDashBoard = () => {
  const { user } = useAuth();

  return (
    <div
      className="leftSideBarContainer flex-shrink-0 p-3 bg-white "
      style={{ width: "280px", border: "2px solid black", height: "100vh" }}
    >
      <div className="d-flex align-items-center pb-3 mb-3 link-dark text decoration-none border-bottom"></div>
      <div className="position-sticky pt-3">
        <div className="d-flex flex-column p-3 bg-white">
          <ul className="list-unstyled ps-0">
            <li>
              <Channels />
            </li>
          </ul>
        </div>
      </div>
      <div>
        <span>Welcome, {user.username}!</span>{" "}
        <span>
          <LogOutBtn />
        </span>
      </div>
    </div>
  );
};

export default LeftDashBoard;
