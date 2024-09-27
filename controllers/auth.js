const bcrypt = require("bcrypt");
const User = require("../models/users/users");
const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const { SECRET_KEY } = process.env;

async function register(req, res, next) {
  const { email, password } = req.body;
  try {
    const currentUser = await User.findOne({ email });
    if (currentUser !== null) {
      return res.status(409).json("message: Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });
    return res
      .status(201)
      .json({ email: newUser.email, subscription: newUser.subscription });
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    const newUser = await User.findOne({ email: email });
    if (!newUser) {
      throw HttpError(401, "Email or password is wrong");
    }
    const isMatch = await bcrypt.compare(password, newUser.password);
    if (!isMatch) {
      throw HttpError(401, "Email or password is wrong");
    }

    const payload = {
      id: newUser._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(newUser._id, { token });
    res.json({
      token,
      email: newUser.email,
      subscription: newUser.subscription,
    });
  } catch (error) {
    next(error);
  }
}

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).end();
};

module.exports = { register, login, getCurrent, logout };
