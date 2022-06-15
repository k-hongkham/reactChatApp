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
  }, []);
  return (
    <div className="channels-container">
      <h2>Channels</h2>
      {channels.length > 0
        ? channels.map((channel, idx) => {
            return (
              <div key={`userGeneratedChannels: ${idx}`}>
                <h3>{channel.name}</h3>
                <CreateChannel setChannels={setChannels} channel={channel} />
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Channels;
