const client = require("../client");

module.exports = {
  createChannel,
};

async function createChannel({ channelId, name }) {
  try {
    const {
      rows: [channel],
    } = await client.query(
      `
        INSERT INTO channels('channelId', name)
        VALUES($1, $2)
        RETURNING *;
        `,
      [channelId, name]
    );
    return channel;
  } catch (error) {
    throw error;
  }
}
