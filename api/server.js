const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const knexSessionStore = require("connect-session-knex")(session);

const usersRouter = require("./users/users-router");
const authRouter = require("../auth/auth-router");
const restricted = require("../auth/restricted-middleware");

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
  // Forces a session that is "uninitialized" to be saved to the store
  saveUninitialized: false,

  store: new knexSessionStore({
    knex: require("../database/dbConfig"),
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60 * 30,
  }),
};

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/users", restricted, usersRouter);
server.use("/api/auth", authRouter);

module.exports = server;
