const { client, User } = require(".");

async function buildTables() {
  try {
    client.connect();
    console.log("Started dropping tables");

    await client.query(`
        DROP TABLE IF EXISTS users
        `);
    console.log("Finished dropping tables");

    await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username varchar(255) UNIQUE NOT NULL,
            password carchar(255) NOT NULL,

        )
        `);

    console.log("Finished creating tables");
  } catch (error) {
    console.log("Problem with building tables");
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log("Starting to create users...");
    const usersToCreate = [{ username: "Kevin", password: "Kevin" }];
    const users = await Promise.all(usersToCreate.map(User.createUser));
    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

buildTables()
  .then(createInitialUsers)
  .catch(console.error)
  .finally(() => client.end);
