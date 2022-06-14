import React from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LogOutBtn = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const { user, setToken } = useAuth();

  const handleLogout = () => {
    if (user.username) {
      localStorage.removeItem("token");
      setToken("");
      navigate("/");
      setLoggedIn(false);
    }
  };

  return (
    <div id="log-out-link" onClick={handleLogout}>
      <button></button>
    </div>
  );
};

export default LogOutBtn;
