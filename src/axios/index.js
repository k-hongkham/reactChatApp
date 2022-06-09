import axios from "axios";

export const apiHealth = async () => {
  try {
    const { data } = await axios.get("/api/health");
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
};

export const getMe = async (token) => {
  try {
    const { data } = await axios.get(`/api/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllUsers = async (token) => {
  try {
    const { data } = await axios.get(`/api/users/all`, {
      heards: {
        "Contect-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const userLogin = async (username, password) => {
  try {
    const { data } = await axios.post(`/api/users/login`, {
      username,
      password,
    });
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export async function registerNewUser(username, password, email) {
  try {
    const { response } = await axios.post("/api/users/registerNewUser", {
      username,
      password,
      email,
    });
    console.log("is api responding?", response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const getAllChannels = async (token) => {
  try {
    const response = await axios.get(`api/channels/all`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const createChannel = async (token, channelId, name) => {
  try {
    const response = await axios.post(
      `api/channels`,
      {
        channelId,
        name,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateChannelName = async (channelId, token, name) => {
  try {
    const response = await axios.patch(
      `api/channels/${channelId}`,
      {
        channelId,
        name,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
