const db = require("../../database/dbConfig.js");

const addUser = newUser => db("users").insert(newUser);

const getUserById = id => db("users").where({ id }).first();

module.exports = { addUser, getUserById };
