import React, { useState, Fragment, useEffect } from "react";
import { getAllChannels, getUserChannels } from "../../axios";
import useAuth from "../hooks/useAuth";
import CreateChannel from "./CreateChannel";

const Channels = () => {
  const [channels, setChannels] = useState([]);
  const { token, user } = useAuth();

  useEffect(() => {
    console.log("user.id and token", user.id, token);
    const userChannels = async () => {
      const response = await getUserChannels(user.id, token);
      setChannels(response);
    };
    userChannels();
  }, [token]);
  return (
    <div className="channels-container">
      <h2>Channels</h2>
      <CreateChannel setChannels={setChannels} channel={channels} />
      {channels.length > 0
        ? channels.map((channel, idx) => {
            return (
              <div key={`userGeneratedChannels: ${idx}`}>
                <h3>{channel.name}</h3>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Channels;
