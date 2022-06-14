import React from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LogOutBtn = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const { user, setToken } = useAuth();

  const handleLogout = (e) => {
    if (user.username) {
      localStorage.removeItem("token");
      setToken("");
      navigate("/");

      console.log("trying to log out to main.");
    }
  };

  return (
    <div id="log-out-link">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogOutBtn;
