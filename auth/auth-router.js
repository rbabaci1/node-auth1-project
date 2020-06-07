const express = require("express");
const bcrypt = require("bcryptjs");

const { addUser, findBy } = require("../api/users/users-model");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 12);

    const addedUser = await addUser({ ...user, password: hash });

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

    const user = await findBy({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = user;
      res.status(200).json({ message: `Welcome ${username}!`, user });
    } else {
      res.status(401).json({ message: "Invalid credentials, try again?" });
    }
  } catch ({ errno, code, message }) {
    res.status(500).json({
      message: "You shall not pass!",
      errno,
      code,
      reason: message,
    });
  }
});

router.delete("/logout", async (req, res) => {
  try {
    if (req.session) {
      req.session.destroy(error => {
        error
          ? res.status(400).json({ message: "Error logging out", error })
          : res.status(200).json({ message: "Logged out. Good bye!" });
      });
    }
  } catch ({ errno, code, message }) {
    res.status(500).json({
      message: "You shall not logout!",
      errno,
      code,
      reason: message,
    });
  }
});

module.exports = router;
