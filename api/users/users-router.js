const express = require("express");

const { getUsers } = require("./users-model");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const user = req.body;
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
