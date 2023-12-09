const { User } = require("../models/Users");
const { ctrlWrapper, HttpError } = require("../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  console.log(req.body);
  try {
    const { email, password, name, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(209).json({ messeage: "Email in use" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashPassword,
      subscription,
      name,
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        name: newUser.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ messeage: "Email or password is wrong" });
    }

    const passwordCompare = password === user.password;
    console.log(passwordCompare);
    if (!passwordCompare) {
      res.status(401).json({ messeage: "Email or password is wrong" });
    }

    const payload = {
      id: user._id,
    };

    const token = await jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });
    console.log(token);
    res.status(200).json({
      token,
      user: {
        email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { _id: id } = req.user;
    const user = await User.findById(id);
    if (!user) {
      res.status(209).json({ messeage: "Email in use" });
      throw HttpError(401, "Not authorized");
    }

    await User.findByIdAndUpdate(id, { token: "" });
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
const currentUser = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      throw HttpError(401, "Not authorized");
    }

    res.json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
};
const updateBySubscription = async (req, res, next) => {
  try {
    const { subscription } = req.body;
    const { _id } = req.user;
    const user = await User.findByIdAndUpdate(
      _id,
      { subscription },
      { new: true }
    );

    if (!user) {
      throw HttpError(401, "Not authorized");
    }

    res.json({ subscription: user.subscription });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  currentUser: ctrlWrapper(currentUser),
  updateBySubscription: ctrlWrapper(updateBySubscription),
};
