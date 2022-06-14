const channelsRouter = require("express").Router();
const {
  createChannel,
  getAllChannels,
  updateChannel,
} = require("../db/models/channel");
const { requireUser } = require("./utils");

channelsRouter.use("/", (req, res, next) => {
  console.log("A request is being made to /channels");
  next();
});

// channelsRouter.get("/all", async (req, res, next) => {
//   try {
//     const allChannels = await getAllChannels();
//     res.send(allChannels);
//   } catch ({ name, message }) {
//     res.status(409);
//     next({ name, message });
//   }
// });

channelsRouter.get("/all", requireUser, async (req, res, next) => {
  try {
    const openChannels = await getAllChannels();
    res.send(openChannels);
  } catch ({ name, message }) {
    res.status(409);
    next({ name, messages });
  }
});

channelsRouter.post("/", async (req, res, next) => {
  const { name } = req.body;
  const channelsData = {
    name,
  };
  try {
    const channel = await createChannel(channelsData);
    res.send(channel);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

channelsRouter.patch("/:channelId", async (req, res, next) => {
  const { channelId } = req.params;
  const { name } = req.body;
  const updateChannelFields = {
    id: channelId,
    name,
  };
  try {
    const updatedChannelName = await updateChannel(updateChannelFields);
    res.send(updatedChannelName);
  } catch ({ name, message }) {
    res.status(409);
    next({ name, message });
  }
});
