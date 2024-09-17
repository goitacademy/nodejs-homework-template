const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

const registerUser = catchAsync(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({ message: "Email in use" });
    }

    const result = await User.create({ email, password });

    user.password = undefined;

    res.status(201).json({
      user: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const loginUser = catchAsync(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1d" });

    user.password = undefined;

    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const currentUser = catchAsync(async (req, res) => {
  try {
    const { email, subscription } = req.user;

    res.status(200).json({
      user: { email, subscription },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const logoutUser = catchAsync(async (req, res) => {
  try {
    const { _id } = req.user;

    await User.findByIdAndUpdate(_id, { token: null });

    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
  logoutUser,
};