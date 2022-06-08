import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { userLogin } from "../../axios";

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  isLoggedIn,
  setIsLoggedIn,
}) => {
  const { setToken } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await userLogin(username, password);
      console.log("RESPONSE ON SUBMIT", response);

      localStorage.setItem("token", response.token);
      setToken(response.token);
      setIsLoggedIn(false);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <header>
        <h2>Login</h2>
      </header>
      <div>
        <form>
          <div>
            <input
              type="text"
              name="login-Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="login-Username">Username</label>
          </div>
          <div>
            <input
              type="password"
              name="login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="login-password">Password</label>
          </div>
          <button onClick={(e) => handleLogin(e)}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
