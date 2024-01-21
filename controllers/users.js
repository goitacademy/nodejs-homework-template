const bcrypt = require("bcrypt");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const HttpError = require("../error/error.js");

async function register(req, res, next) {
  const { password, email, subscription } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user !== null) {
      throw  HttpError(409, "Email in use");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      password: passwordHash,
      email,
      subscription,
    });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60,
    });

    await User.findByIdAndUpdate(newUser._id, { token });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  const { password, email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user === null) {
      throw  HttpError(401, "Email or password is wrong");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw  HttpError(401, "Email or password is wrong");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60,
    });

    await User.findByIdAndUpdate(user._id, { token });

     res.json({
       token,
       user: {
         email: user.email,
         subscription: user.subscription,
       },
     });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

async function getCurrent(req, res, next) {
  try {
    const { email, subscription } = req.user;
    res.json({ email, subscription });
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login, logout, getCurrent };
