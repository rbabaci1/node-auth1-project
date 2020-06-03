const db = require("../../database/dbConfig.js");

const addUser = newUser => db("users").insert(newUser);

const findBy = filter => db("users").where(filter).first();

const getUsers = () => db("users");

module.exports = { addUser, findBy, getUsers };
