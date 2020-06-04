const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const knexSessionStore = require("connect-session-knex")(session);

const usersRouter = require("./users/users-router");
const authRouter = require("../auth/auth-router");
const restricted = require("../auth/restricted-middleware");

const server = express();

const HALF_HOUR = 1000 * 60 * 30;

const {
  NODE_ENV = "development",
  SESS_NAME = "rabah_session",
  SESS_SECRET = "north african guy",
  SESS_LIFETIME = HALF_HOUR,
} = process.env;

const IN_PROD = NODE_ENV === "production";

const sessionConfig = {
  name: SESS_NAME,
  secret: SESS_SECRET,
  cookie: {
    maxAge: SESS_LIFETIME,
    httpOnly: true,
    secure: IN_PROD,
    sameSite: true,
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
    clearInterval: HALF_HOUR,
  }),
};

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/users", restricted, usersRouter);
server.use("/api/auth", authRouter);

module.exports = server;
