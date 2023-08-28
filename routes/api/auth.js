const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");
const authorize = require("../../middleware/authorize");

const { SECRET_KEY } = process.env;

const router = express.Router();

const emailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter"),
});

const logInSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});

router.post("/register", async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "email in use" });
    }
    const hash = await bcrypt.hash(password, 10);
    const result = await User.create({
      email,
      password: hash,
      subscription,
    });
    res.status(201).json(result.email);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { error } = logInSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "invalid email or password" });
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({ message: "invalid email or password" });
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.status(200).json(token);
  } catch (error) {
    next(error);
  }
});

router.get("/logout", authorize, async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.json({ message: "logged out" });
  } catch (error) {
    next(error);
  }
});

router.get("/current", authorize, async (req, res, next) => {
  const { email, phone, subscription } = req.user;
  res.json({ email, phone, subscription });
});

router.patch("/subscription", authorize, async (req, res, next) => {
  try {
    const { _id } = req.user;

    const { error } = updateSubscriptionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "missing subscription option" });
    }
    const result = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json("subscription updated");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
