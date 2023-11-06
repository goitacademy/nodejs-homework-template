

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { jwtSecret } = require('../config');

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({ message: 'Email in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });

    return res.status(201).json({ user: { email: newUser.email, subscription: newUser.subscription } });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });

    user.token = token;
    await user.save();

    return res.status(200).json({ token, user: { email: user.email, subscription: user.subscription } });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const logoutUser = async (req, res) => {
  req.user.token = null;
  await req.user.save();
  return res.status(204).send();
};

const getCurrentUser = (req, res) => {
  return res.status(200).json({ email: req.user.email, subscription: req.user.subscription });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
};
