const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const { Unauthorized, Conflict } = require('http-errors')
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env;

async function register(req, res, next) {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const savedUser = await User.create({
      email,
      password: hashedPassword,
    });
    console.log(savedUser);
    res.status(201).json({
      data: {
        user: savedUser,
      },
    });
  } catch (error) {
    console.log(error.message)
    if (error.message.includes("E11000 duplicate key error")) {
      throw Conflict("Email in use");
    }
    throw error;
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  const storedUser = await User.findOne({ email });

  if (!storedUser) {
    throw Unauthorized("Email or password is not valid");
  }

  const isPasswordValid = await bcrypt.compare(password, storedUser.password);

  if (!isPasswordValid) {
    throw Unauthorized("Email or password is not valid");
  }

  const payload = { id: storedUser._id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  await User.findByIdAndUpdate(storedUser._id, { token });
  return res.json({
    data: {
      token: token,
      user: {
        email: email,
        subscription: "starter",
      },
    },
  });
}

async function logout(req, res, next) {
  const { _id } = req.user
  await User.findByIdAndUpdate(_id, { token: null })
  return res.status(204).json()
}

async function getCurrentUser(req, res, next) {
  const { id, email, token, subscription } = req.user;
  if (!token) {
    throw Unauthorized("Not authorized")  
  }
  return res.status(200).json({
    data: {
      user: {
        _id: id,
        email: email,
        subscription: subscription,
        token: token,
      },
    },
  });
}

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
};
