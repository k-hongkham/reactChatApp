import React, { useState } from "react";
import "../style/App.css";
import AuthProvider from "./context/AuthContext";
import Login from "./Login/Login.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import LeftDashBoard from "./LeftPanelDashboard/LeftDashBoard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <AuthProvider>
        {isLoggedIn ? (
          <LeftDashBoard />
        ) : (
          <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        )}
      </AuthProvider>
    </Router>
  );
}

export default App;
