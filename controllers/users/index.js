const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const signup = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already used!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword });

    await user.save();

    res.status(201).json({ user: { email: user.email, subscription: user.subscription } });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "No user with such email found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Wrong password. Please try again" });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecretKey, { expiresIn: "1h" });

    user.token = token;
    await user.save();

    return res.status(200).json({ token, user: { email: user.email, subscription: user.subscription } });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    req.user.token = null;
    await req.user.save();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const getCurrentUser = (req, res) => {
  return res.status(200).json({ email: req.user.email, subscription: req.user.subscription });
};

module.exports = { signup, login, logout, getCurrentUser };
