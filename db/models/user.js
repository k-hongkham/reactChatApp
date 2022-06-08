const client = require("../client");

module.exports = {
  createUser,
  getUserByUsername,
  createNewUser,
};

async function createUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO users (username, password)
            VALUES($1, $2)
            ON CONFLICT (username) DO NOTHING
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
async function createNewUser({ username, password, email }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    INSERT INTO users(username, password, email)
    VALUES($1,$2,$3)
    ON CONFLICT (username) DO NOTHING
    RETURNING id, username, email`,
      [username, password, email]
    );
    return user;
  } catch (error) {
    throw error;
  }
}
