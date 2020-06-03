const express = require("express");
const bcrypt = require("bcryptjs");

const { addUser, findBy } = require("../api/users/users-model");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 12);

    const [id] = await addUser({ ...user, password: hash });
    const addedUser = await findBy(id);

    res.status(201).json(addedUser);
  } catch ({ errno, code, message }) {
    res.status(500).json({
      message: "The user could not be registered at this moment.",
      errno,
      code,
      reason: message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await findBy(username);

    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.authenticated = true;
      res.status(200).json({ message: `Welcome ${username}!` });
    } else {
      res.status(401).json({ message: "Invalid credentials, try again?" });
    }
  } catch ({ errno, code, message }) {
    res.status(500).json({
      message: "You can't login at this moment.",
      errno,
      code,
      reason: message,
    });
  }
});

module.exports = router;
