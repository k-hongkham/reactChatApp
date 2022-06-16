import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterUser from "./RegisterUser";

const Login = ({ setLoggedIn, loggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div>
      {isRegistered ? (
        <RegisterUser
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          error={error}
          setError={setError}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          setLoggedIn={setLoggedIn}
          setIsRegistered={setIsRegistered}
        />
      ) : (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          setLoggedIn={setLoggedIn}
          error={error}
          setError={setError}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          setIsRegistered={setIsRegistered}
        />
      )}
    </div>
  );
};

export default Login;
