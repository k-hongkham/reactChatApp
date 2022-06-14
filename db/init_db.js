const { client, User, Channel } = require("./");

async function buildTables() {
  try {
    client.connect();
    console.log("Started dropping tables");

    await client.query(`
        DROP TABLE IF EXISTS channels;
        DROP TABLE IF EXISTS users;
        `);
    console.log("Finished dropping tables");

    await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username varchar(255) UNIQUE NOT NULL,
            password varchar(255) NOT NULL,
            email varchar(255) UNIQUE
        );
        CREATE TABLE channels (
            id SERIAL PRIMARY KEY,
            "userId" INTEGER REFERENCES users(id),
            name varchar(255) NOT NULL
        );
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
    const usersToCreate = [
      { username: "kevin", password: "kevin", email: "kevin@kevin.com" },
    ];
    const users = await Promise.all(usersToCreate.map(User.createUser));
    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function createInitalChannels() {
  try {
    console.log("Starting to create channels....");
    const channelsToCreate = [{ userId: 1, name: "testChannel" }];
    const channels = await Promise.all(
      channelsToCreate.map(Channel.createChannel)
    );
    console.error("Finished creating channels!");
  } catch (error) {
    console.error("Error creating channels!");
    throw error;
  }
}

buildTables()
  .then(createInitialUsers)
  .then(createInitalChannels)
  .catch(console.error)
  .finally(() => client.end);
