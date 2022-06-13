import React, { useState, useEffect } from "react";
import { getMe, getAllUsers } from "../../axios";

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const getAllTheUsers = async () => {
    const users = await getAllUsers(token);
    setAllUsers(users);
  };

  useEffect(() => {
    const getUser = async () => {
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
