import React, { useEffect, useState } from "react";
import { registerNewUser } from "../../axios";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

const RegisterUser = ({
  username,
  setUsername,
  password,
  setPassword,
  error,
  setError,
  errorMessage,
  setErrorMessage,
  isLoggedIn,
  setIsLoggedIn,
  setIsRegistered,
}) => {
  const { setToken } = useAuth();
  const [newUserEmail, setNewUserEmail] = useState("");
  const [confirmPW, setConfirmPW] = useState("");

  useEffect(() => {
    setError(false);
  }, []);

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      if (password === confirmPW && password.length > 0) {
        const response = await registerNewUser(
          username,
          password,
          newUserEmail
        );
        setError(false);
        localStorage.setItem("token", response.token);
        setToken(response.token);
        setIsLoggedIn(false);
      } else {
        setError(true);
        setErrorMessage("Password does not match.");
      }
    } catch (error) {
      setError(true);
      setErrorMessage("Password does not match.");
    }
  };

  return (
    <div className="modal modal-signin position-static d-block bg-secondary py-5">
      <div className="model-content rounded-4 shadow">
        <div className="modal-header p-5 pb-4 border-bottom-0">
          <h2 className="fw-bold mb-0" id="login-header">
            Register a New Account
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
                name="register-Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="register-Username floatingInput">Username</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control rounded-3"
                id="floatingPassword"
                placeholder="Password"
                name="register-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="register-password floatingPassword">
                Password
              </label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control rounded-3"
                id="floatingPassword"
                placeholder="Confirm Password"
                name="confirm-password"
                value={confirmPW}
                onChange={(e) => setConfirmPW(e.target.value)}
              />
              <label htmlFor="confirm-password floatingPassword">
                {" "}
                Confirm Password
              </label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control rounded-3"
                id="floatingPassword"
                placeholder="Password"
                name="register-email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
              />
              <label htmlFor="register-email floatingPassword">Email</label>
            </div>
            <button
              className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
              type="submit "
              onClick={(e) => handleRegistration(e.target.value)}
            >
              Register
            </button>
            <hr className="my-4"></hr>
            <h2 className="fs-5 fw-bold mb-3"> Already a member?</h2>
            <Link to="/login" className="nav-link">
              <button
                className="w-100 py-2 mb-2 btn btn-outline-dark rounded-3"
                type="submit"
                onClick={() => {
                  setIsRegistered(false);
                }}
              >
                Return to Login
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
