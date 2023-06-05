const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const User = require("../models/user");

async function getAllUsers(req, res, next) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

async function register(req, res, next) {
  const newUserSchema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string()
      .min(8)
      .max(20)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/)
      .required(),
    subscription: req.body.subscription,
  });
  try {
    const newUser = await newUserSchema.validateAsync(req.body);

    const currentUser = await User.findOne({ email: newUser.email });
    if (currentUser !== null) {
      return res.status(409).json({ message: "User already exists" });
    }

    newUser.password = await bcrypt.hash(newUser.password, 10);

    await User.create(newUser);
    return res
      .status(201)
      .json({ message: `User ${newUser.email} created successfully` });
  } catch (error) {
    if (error.details && error.details[0].context.key === "email") {
      return res.status(400).json({ error: "Invalid email address" });
    }
    return res.status(400).json({
      error:
        "Your password must be at least 8 characters long and contain at least one lowercase letter, at least one uppercase letter, and at least one number.",
    });
  }
}

async function login(req, res, next) {
  // const user = await User.findOne({ email: req.body.email });
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user === null) {
      return res.status(401).json({ error: "Email or password is incorrect" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Email or password is incorrect" });
    }

    const payload = {
      userId: user.id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23 h" });

    res.json({ token, user: {userId : user.id, email, subscription : user.subscription} });
  } catch (error) {
    return next(error);
  }
}

async function logout(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Not authorized" });
    }
    res.json({ message: "Logout successful, no content" });
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login, getAllUsers, logout };
