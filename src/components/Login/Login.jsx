import React, { useState } from "react";
import LoginForm from "./LoginForm";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div>
      <LoginForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        error={error}
        setError={setError}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default Login;
