// controllers/auth.js

const User = require("../models/user");

const register = async (req, res, next) => {
  try {
    console.log("Request body:", req.body);
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
    console.error("Error in register controller:", error);

    // Додайте виведення в консоль для подробиць про помилку валідації
    if (error.details) {
      console.error("Validation error details:", error.details);
    }

    next(error);
  }
};

module.exports = {
  register,
};

