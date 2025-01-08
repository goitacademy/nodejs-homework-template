const express = require("express");
const joi = require("joi");
const User = require("../../../models/User");
const authMiddleware = require("../../../authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/", authMiddleware, async (req, res, next) => {
  try {
    const { subscription } = req.body;

    const { error } = joi
      .object({
        subscription: joi
          .string()
          .valid("starter", "pro", "business")
          .required(),
      })
      .validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.subscription = subscription;
    await user.save();

    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
