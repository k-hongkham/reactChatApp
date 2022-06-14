import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { createChannel, getAllChannels } from "../../axios";

const CreateChannel = ({ setChannels, channel }) => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [channelName, setChannelName] = useState("");

  const handleChannelCreate = (e) => {
    e.preventDefault();
    const getChannelDetails = async (e) => {
      const newChannelDetails = await createChannel(user.id, channelName);

      const newChannelsArray = [newChannelDetails, ...channel];
      setChannels(newChannelsArray);
    };
    getChannelDetails();
    getAllChannels();
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
