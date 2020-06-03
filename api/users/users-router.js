const express = require("express");

const { getUsers } = require("./users-model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await getUsers();

    res.status(200).json(users);
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
