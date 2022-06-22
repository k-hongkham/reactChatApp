import React, { useState } from "react";
import "../style/App.css";
import AuthProvider from "./context/AuthContext";
import Login from "./Login/Login.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import LeftDashBoard from "./LeftPanelDashboard/LeftDashBoard";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <Router>
      <AuthProvider>
        <LeftDashBoard setLoggedIn={setLoggedIn} />
      </AuthProvider>
    </Router>
  );
};

export default App;
