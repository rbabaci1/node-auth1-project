const db = require("../../database/dbConfig.js");

const addUser = async newUser => {
  const [id] = await db("users").insert(newUser);
  return findBy({ id });
};

const findBy = filter => db("users").where(filter).first();

const getUsers = () => db("users");

module.exports = { addUser, findBy, getUsers };
