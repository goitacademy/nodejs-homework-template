const express = require("express");
const authMiddleware = require("../../../authMiddleware");
const User = require("../../../models/User");

const router = express.Router();

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        status: "401 Unauthorized",
        contentType: "application/json",
        responseBody: {
          message: "Not authorized",
        },
      });
    }

    user.token = null;
    await user.save();

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
