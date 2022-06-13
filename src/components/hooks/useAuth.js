import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const useAuth = () => {
  const { user, setUser, token, setToken } = useContext(AuthContext);

  return {
    user,
    setUser,
    token,
    setToken,
  };
};

export default useAuth;
