import React, { useState, Fragment, useEffect } from "react";
import { getAllChannels } from "../../axios";
import useAuth from "../hooks/useAuth";

const Channels = () => {
  const [channels, setChannels] = useState([]);
  const { token } = useAuth();
  useEffect(() => {
    const userChannels = async () => {
      const response = await getAllChannels(token);
      setChannels(response);
    };
    userChannels();
  }, []);
  return (
    <div className="channels-container">
      <h2>Channels</h2>
      {channels.map((channel, idx) => {
        return (
          <div>
            <h3>{channel.name}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Channels;
