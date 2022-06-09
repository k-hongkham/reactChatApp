import React, { useState } from "react";
import "../style/App.css";
import AuthProvider from "./context/AuthContext";
import Login from "./Login/Login.jsx";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <AuthProvider>
        <Login isLoggedIn={isLoggedIn} setisLoggedIn={setIsLoggedIn} />
      </AuthProvider>
    </Router>
  );
}

export default App;
