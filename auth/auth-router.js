const express = require("express");
const bcrypt = require("bcryptjs");

const { addUser, getUserById } = require("../api/users/users-model");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 5);

    const [id] = await addUser({ ...user, password: hash });
    const addedUser = await getUserById(id);

    res.status(201).json(addedUser);
  } catch ({ errno, code, message }) {
    res.status(500).json({
      message: "The user could not be added at this moment.",
      errno,
      code,
      reason: message,
    });
  }
});

module.exports = router;
