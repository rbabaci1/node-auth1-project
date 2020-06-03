const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const knexSessionStore = require("connect-session-knex")(session);

const usersRouter = require("./users/users-router");
const authRouter = require("../auth/auth-router");

const server = express();

const sessionConfig = {
  name: "Rabah's session",
  secret: "North african guy",
  cookie: {
    maxAge: 1000 * 60 * 30,
    httpOnly: true,
    secure: false, // should be true in production
  },
  // forces the session to be saved to the session store,
  // even the session was never modified during the request
  resave: false,
  //Forces a session that is "uninitialized" to be saved to the store
  saveUninitialized: false,
};

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);

module.exports = server;
