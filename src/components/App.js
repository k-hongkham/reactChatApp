import React from "react";
import "../style/App.css";
import AuthProvider from "./context/AuthContext";
import Login from "./Login/Login.jsx";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </Router>
  );
}

export default App;
