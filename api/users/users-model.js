const db = require("../../database/dbConfig.js");

const getUsers = db("users");

module.exports = { getUsers };
