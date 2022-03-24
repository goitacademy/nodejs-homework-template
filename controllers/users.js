const { User } = require("../models");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(409).json({
      message: "Email in use",
    });
  }
  const newUser = await User({ email });
  newUser.setPassword(password);
  await newUser.save();
  res.status(201).json({
    user: {
      email,
      subscription: "starter",
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    res.status(409).json({
      message: "Email or password is wrong",
    });
  }
  const payload = await {
    id: user._id,
  };
  const token = await jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  await res.json({
    token,
    user: {
      email: "example@example.com",
      subscription: "starter",
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user) {
    res.status(401).json({
      message: "Not authorized",
    });
  }
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};

const currentUser = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    user: {
      email,
      subscription,
    },
  });
};
module.exports = { signUp, login, logout, currentUser };
