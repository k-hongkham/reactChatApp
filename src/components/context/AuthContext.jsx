import React, { useState, useEffect } from "react";
import { getMe, getAllUsers } from "../../axios";

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loggedIn, setLoggedIn] = useState(false);

  // const getAllTheUsers = async () => {
  //   const users = await getAllUsers(token);
  //   setAllUsers(users);
  // };

  useEffect(() => {
    const getUser = async () => {
      if ("token" in localStorage) {
        console.log("token is here in local storage");
      }
      if (localStorage.getItem("token")) {
        const user = await getMe(token);
        setUser(user);
      } else {
        setUser({});
        setAllUsers([]);
      }
    };
    getUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        allUsers,
        setAllUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
