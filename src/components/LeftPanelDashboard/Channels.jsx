import React, { useState, Fragment, useEffect } from "react";
import { getAllChannels, getUserChannels } from "../../axios";
import useAuth from "../hooks/useAuth";
import ChatRooms from "./ChatRooms";
import CreateChannel from "./CreateChannel";

const Channels = () => {
  const [channels, setChannels] = useState([]);
  const { token, user } = useAuth();

  useEffect(() => {
    console.log("user.id and token", user.id, token);
    const userChannels = async () => {
      const response = await getUserChannels(user.id, token);
      console.log("getting user channels in component", response.data);

      setChannels(response.data);
    };
    userChannels();
  }, [token]);
  return (
    <div className="channels-container">
      <h2>Channels</h2>
      <h3>{channels.name}</h3>
      <CreateChannel setChannels={setChannels} channels={channels} />

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
