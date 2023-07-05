const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret =
  "7fa6f4a152ab0683a2565acbf5316dbff0c354627a7829e34d9565016259f91cfc7496";
const User = require("../models/User");

exports.register = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    bcrypt.hash(password, 10).then(async (hash) => {
      await User.create({
        email,
        password: hash,
      }).then((user) =>
        res.status(200).json({
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
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign(
            { id: user._id, email, subscription: user.subscription },
            jwtSecret,
            {
              expiresIn: maxAge, // 3hrs in sec
            }
          );
          User.findByIdAndUpdate(user._id, { token });
          res.json({
            token,
            user: {
              email: user.email,
              subscription: user.subscription,
            },
          });
        } else {
          res.status(400).json({ message: "Login not succesful" });
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
