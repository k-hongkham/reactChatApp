import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { createChannel, getAllChannels } from "../../axios";

const CreateChannel = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();

  return <div></div>;
};

export default CreateChannel;
