const client = require("../client");

module.exports = {
  createUser,
  getUserByUsername,
  getUserByEmail,
};

async function createUser({ username, password, email, tagname }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO users (username, password, email, tagname)
            VALUES($1, $2, $3, $4)
            ON CONFLICT (username) DO NOTHING
            RETURNING id, username, email, tagname;
            `,
      [username, password, email, tagname]
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

async function getUserByEmail(email) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT *
    FROM users
    WHERE email=$1;
    `,
      [email]
    );
    return user;
  } catch (error) {
    throw error;
  }
}
