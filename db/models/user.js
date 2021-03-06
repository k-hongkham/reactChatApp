const client = require("../client");

module.exports = {
  createUser,
  getUserByUsername,
  getUserByEmail,
  getAllUsers,
};

async function createUser({ username, password, email }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO users (username, password, email)
            VALUES($1, $2, $3)
            ON CONFLICT (username) DO NOTHING
            RETURNING id, username, email;
            `,
      [username, password, email]
    );
    console.log("creating new user", user);
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

async function getAllUsers() {
  try {
    const { rows } = await client.query(`
    SELECT id, username
    FROM users
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}
