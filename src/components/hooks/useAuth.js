import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const useAuth = () => {
  const { user, setUser, token, setToken, allUsers, setAllUsers } = useContext(
    AuthContext
  );

  return {
    user,
    setUser,
    token,
    setToken,
    allUsers,
    setAllUsers,
  };
};

export default useAuth;
