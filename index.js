//This is the Web Server
require("dotenv").config();
const express = require("express");
const server = express();

const cors = require("cors");
server.use(cors());

// create  logs for everything
const morgan = require("morgan");
server.use(morgan("dev"));

// handle application/json requests
server.use(express.json());
server.use((req, res, next) => {
  console.log("BODY LOGGER START");
  console.log(req.body);
  console.log("BODY LOGGER END");
  next();
});

// static files
const path = require("path");
server.use(express.static(path.join(__dirname, "build")));

// API
server.use("/api", require("./api"));

//defaults to react app if route isn't recognized
server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// DB connection
const { client } = require("./db");

//connect to server
const PORT = process.env.PORT || 4000;

//define server handle to close open tcp connection after unit tests have run
const handle = server.listen(PORT, async () => {
  console.log(`Service is running on ${PORT}!`);

  try {
    await client.connect();
    console.log("Database is open for business!");
  } catch (error) {
    console.error("Database is closed for repairs!\n", error);
  }
});

module.exports = { server, handle };
