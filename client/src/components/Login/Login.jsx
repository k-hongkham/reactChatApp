import React, { useState } from "react";
import LoginForm from "./LoginForm";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Error, setError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");

  return (
    <div id="login_portal">
      <LoginForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        ErrorMessage={ErrorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default Login;
