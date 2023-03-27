const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers/index");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");

const dotenv = require("dotenv");
dotenv.config();
const { JWT_SECRET } = process.env;

const register = async (req, res, next) => {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      email,
      password,
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      throw new HttpError(409, "Email in use");
    }
    throw error;
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const storedUser = await User.findOne({
    email,
  });
  console.log(storedUser);
  if (!storedUser) {
    throw new HttpError(401, "Email or password is wrong");
  }

  const isPasswordValid = await bcrypt.compare(password, storedUser.password);

  if (!isPasswordValid) {
    throw new HttpError(401, "Password is not valid");
  }
  console.log(JWT_SECRET);

  const token = jwt.sign({ id: storedUser.id }, JWT_SECRET);
  res.status(200).json({
    data: {
      token,
    },
  });
};

const getCurrentUser = async (req, res, next) => {
  res.json({
    ok: true,
  });
};

module.exports = {
  register,
  login,
  getCurrentUser,
};
