import React, { useState } from "react";
import useAuth from "../hooks/useAuth";

const LoginForm = () => {
  const { setToken } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
};

export default LoginForm;
