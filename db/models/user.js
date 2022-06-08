const client = require("../client");

module.exports = {
  createUser,
  getUserByUsername,
};

async function createUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO users (username, password)
            VALUES($1, $2)
            ON CONFLICT (username) DO NOTHIGN
            RETURNING id, username;
            `,
      [username, password]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            SELECT *
            FROM users
            WHERE username =$1;
            `,
      [username]
    );
    return user;
  } catch (error) {
    throw error;
  }
}
