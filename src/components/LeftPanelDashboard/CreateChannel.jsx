import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { createChannel, getUserChannels } from "../../axios";

const CreateChannel = ({ setChannels, channels }) => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [channelName, setChannelName] = useState("");

  const handleChannelCreate = (e) => {
    e.preventDefault();
    console.log("looking at channels", channels);
    const getChannelDetails = async () => {
      const newChannelDetails = await createChannel(
        token,
        user.id,
        channelName
      );
      const newChannelsArray = [newChannelDetails, ...channels];

      console.log("is new channel being made?", channels);
      setChannels(newChannelsArray);
    };
    getChannelDetails();
    getUserChannels(user.id, token);
  };
  return (
    <div>
      <form onSubmit={handleChannelCreate}>
        <input
          value={channelName}
          type="text"
          placeholder="Channel Name"
          onChange={(e) => {
            setChannelName(e.target.value);
          }}
        ></input>
        <button type="submit">Make a New Channel</button>
      </form>
    </div>
  );
};

export default CreateChannel;
