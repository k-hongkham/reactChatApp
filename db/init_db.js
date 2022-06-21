const { client, User, Channel, Chatrooms } = require("./");

async function buildTables() {
  try {
    client.connect();
    console.log("Started dropping tables");

    await client.query(`
        DROP TABLE IF EXISTS channels;
        DROP TABLE IF EXISTS chatrooms;
        DROP TABLE IF EXISTS users;
        `);
    console.log("Finished dropping tables");
    console.log("Started creating tables");
    await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username varchar(255) UNIQUE NOT NULL,
            password varchar(255) NOT NULL,
            email varchar(255) UNIQUE
        );
        CREATE TABLE chatrooms (
          id SERIAL PRIMARY KEY,
          name varchar(255) NOT NULL
      );
        CREATE TABLE channels (
            id SERIAL PRIMARY KEY,
            "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE,
            "chatroomsId" INTEGER REFERENCES chatrooms(id) ON DELETE CASCADE,
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

async function createInitialChannels() {
  try {
    console.log("Starting to create channels....");
    const channelsToCreate = [
      { userId: 1, chatroomsId: 1, name: "testChannel" },
      { userId: 1, chatroomsId: 2, name: "testChannel2" },
    ];
    const channels = await Promise.all(
      channelsToCreate.map(Channel.createChannel)
    );
    console.log("Finished creating channels!");
  } catch (error) {
    console.error("Error creating channels!");
    throw error;
  }
}

async function createInitialChatrooms() {
  try {
    console.log("Starting to create chatrooms ....");
    const chatroomsToCreate = [{ name: "chatroom11" }, { name: "chatroom22" }];
    const chatrooms = await Promise.all(
      chatroomsToCreate.map(Chatrooms.createChatroom)
    );
    console.error("Finished creating chatrooms!");
  } catch (error) {
    console.error("Error creating chatrooms!");
    throw error;
  }
}

buildTables()
  .then(createInitialUsers)
  .then(createInitialChatrooms)
  .then(createInitialChannels)
  .catch(console.error)
  .finally(() => client.end);
