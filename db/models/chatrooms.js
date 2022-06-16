const client = require("../client");

module.exports = { createChatroom };

async function createChatroom({ name }) {
  try {
    const {
      rows: [chatroom],
    } = await client.query(
      `
        INSERT INTO chatrooms(name)
        VALUES($1)
        RETURNING *;
        `,
      [name]
    );
    console.log("creating new chatroom", chatroom);
    return chatroom;
  } catch (error) {
    throw error;
  }
}

async function addChatroomToChannel({ channelId }) {
  try {
    const { rows } = await client.query(
      `
        SELECT 
        chatroom.id AS "chatroomId", 
        name
        FROM chatrooms
        LEFT JOIN chatrooms ON channels.chatrooms = chatrooms.id
        WHERE chatrooms=$1
        `,
      [channelId]
    );
    console.log("adding chatrooms to channels.", rows);
    return rows;
  } catch (error) {
    throw error;
  }
}
