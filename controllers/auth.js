// controllers/auth.js

const User = require("../models/user");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
    }

    const user = new User({ email, password });
    await user.save();

    const token = user.generateAuthToken();
    res.status(201).json({ user: { email: user.email, subscription: user.subscription }, token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
};
