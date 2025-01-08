const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const User = require("../../../models/User");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      console.error("Validation error:", error.details[0].message);
      return res.status(400).json({
        status: "400 Bad Request",
        contentType: "application/json",
        responseBody: { message: error.details[0].message },
      });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: "401 Unauthorized",
        contentType: "application/json",
        responseBody: { message: "Email or password is wrong" },
      });
    }

    if (!user.verify) {
      return res.status(403).json({
        status: "403 Forbidden",
        contentType: "application/json",
        responseBody: { message: "Email not verified" },
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: "401 Unauthorized",
        contentType: "application/json",
        responseBody: { message: "Email or password is wrong" },
      });
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("Generated token:", token);

    user.token = token;
    await user.save();

    console.log("User after save:", user);

    const updatedUser = await User.findById(user.id);
    console.log("Updated user:", updatedUser);

    res.status(200).json({
      status: "200 OK",
      contentType: "application/json",
      responseBody: {
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    next(error);
  }
});

module.exports = router;
