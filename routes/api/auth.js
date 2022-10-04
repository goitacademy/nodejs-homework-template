const { Router } = require("express");
const router = Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require("joi");

const { SECRET_KEY } = process.env;

const emailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;


const { validateSchema } = require("../../helpers");
const User = require("../../models/userModel");
const { createError } = require("../../helpers");
const authorize = require('../../middleware/authorize');

// JOI-schemas
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


// Routers
router.post("/signup", async (req, res, next) => {
  try {
    validateSchema(registerSchema, req.body);

    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw createError(409, "Email already exist");
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
    validateSchema(logInSchema, req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passwordValid = bcrypt.compare(password, user.password);
    if (!passwordValid || !user) {
      throw createError(401, "Invalid email or password");
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
    validateSchema(updateSubscriptionSchema, req.body);
    const result = await User.findByIdAndUpdate(_id, req.body, { new: true, });
    res.json("subscription updated");
    if (!result) {
      throw createError(404, "User not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
