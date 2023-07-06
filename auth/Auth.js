const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const User = require("../models/User");

exports.register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  try {
    if (user) {
      res.status(409).json({
        message: "Email in use",
      });
    }
    bcrypt.hash(password, 10).then(async (hash) => {
      await User.create({
        email,
        password: hash,
      }).then((user) =>
        res.status(201).json({
          message: "User successfully created",
          user,
        })
      );
    });
  } catch (error) {
    res.status(401).json({
      message: "User not successful created",
      error: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  // Check if username and password is provided
  if (!email || !password) {
    return res.status(400).json({
      message: "Email or Password not present",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      });
    } else {
      bcrypt.compare(password, user.password).then(function (result) {
        if (result) {
          const payload = {
            id: user.id,
            email: user.email,
          };
          const token = jwt.sign(payload, secret, { expiresIn: "1h" });
          User.findByIdAndUpdate(user._id, { token });
          res.json({
            status: "success",
            code: 200,
            data: {
              token,
            },
          });
        } else {
          res.status(401).json({ message: "Email or password is wrong" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

exports.update = async (req, res, next) => {
  const { subscription, _id } = req.body;
  const subscriptions = ["starter", "pro", "business"];

  if (!subscriptions.includes(subscription)) {
    res.status(400).json({ message: "There is no such subscription" });
  }
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  res.status(200).json({
    message: "Update successfull",
    data: subscription,
    updatedUser,
  });
};
exports.getCurrent = async (req, res, next) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};
exports.logout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).send();
};
