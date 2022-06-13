import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { userLogin } from "../../axios";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  setIsLoggedIn,
  setIsRegistered,
  setError,
  setErrorMessage,
}) => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setError(false);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await userLogin(username, password);
      console.log("RESPONSE ON SUBMIT", response);
      setError(false);
      localStorage.setItem("token", response.token);
      setToken(response.token);
      setIsLoggedIn(true);
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="modal modal-signin position-static d-block bg-secondary py-5">
      <div className="model-content rounded-4 shadow">
        <div className="modal-header p-5 pb-4 border-bottom-0">
          <h2 className="fw-bold mb-0" id="login-header">
            Login
          </h2>
        </div>
        <div className="modal-body p-5 pt-0">
          <form>
            <div className="form-floating mb-3">
              <input
                type="login"
                className="form-control rounded-3"
                id="floatingInput"
                placeholder="name@example.com"
                name="login-Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="login-Username floatingInput">Username</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control rounded-3"
                id="floatingPassword"
                placeholder="Password"
                name="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="login-password floatingPassword">Password</label>
            </div>
            <button
              className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
              type="submit "
              onClick={(e) => handleLogin(e)}
            >
              Submit
            </button>
            <hr className="my-4"></hr>
            <h2 className="fs-5 fw-bold mb-3"> Or Sign up for free</h2>
            <Link to="/registerNewUser" className="nav-link">
              <button
                className="w-100 py-2 mb-2 btn btn-outline-dark rounded-3"
                type="submit"
                onClick={(e) => setIsRegistered(true)}
              >
                Register a New Account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
