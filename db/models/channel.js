const client = require("../client");

module.exports = {
  createChannel,
  getAllChannels,
  updateChannel,
};

async function createChannel({ userId, name }) {
  try {
    const {
      rows: [channel],
    } = await client.query(
      `
        INSERT INTO channels("userId",name)
        VALUES($1, $2)
        RETURNING channels.id as "channelId",*;
        `,
      [userId, name]
    );
    return channel;
  } catch (error) {
    throw error;
  }
}

async function getUserChannels(userId) {
  try {
    const { rows } = await client.query(
      `
    SELECT
    "userId", channels.id as "channelId"
    FROM channels
    LEFT JOIN users ON channels."userId" = users.id
    WHERE "userId"=$1    
    `,
      [userId]
    );
  } catch (error) {}
}

async function getAllChannels() {
  try {
    const { rows } = await client.query(`
        SELECT
        channels.id AS id,
        channels.name AS name
        FROM channels
        ORDER BY channels.id desc
        `);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function updateChannel(fields = {}) {
  const setString = Object.keys(fields)
    .map((key, idx) => `'${key}'=$${idx + 1}`)
    .join(", ");
  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [channel],
    } = await client.query(
      `
        UPDATE channels
        SET ${setString}
        WHERE id=${fields.id}
        RETURNING *;
        `,
      Object.values(fields)
    );
    return channel;
  } catch (error) {
    throw error;
  }
}
