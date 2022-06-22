const client = require("../client");

module.exports = {
  addChatroomToChannel,
};

async function addChatroomToChannel({ channelId, chatroomsId }) {
  try {
    const {
      rows: [chatroom],
    } = await client.query(
      `
          INSERT INTO channel_chatrooms("channelId", "chatroomsId") 
          name)
          VALUES($1, $2)
          `,
      [channelId, chatroomsId]
    );
    console.log("adding chatrooms to channels.", chatroom);
    return chatroom;
  } catch (error) {
    throw error;
  }
}
