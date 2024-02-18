const express = require("express");
const signup = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const User = require("../../model/user.model");

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

signup.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = signupSchema.validate({ email, password });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    newUser.token = token;
    await newUser.save();

    res.status(201).json({
      message: "Success, user registered",
      user: { email: newUser.email, subscription: newUser.subscription },
      token: newUser.token,
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = signup;
