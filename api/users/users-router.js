const express = require("express");

const { addUser, getUserById } = require("./users-model");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const user = req.body;

    const [id] = await addUser(user);
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
