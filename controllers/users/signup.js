const User = require("../../models/user.js");
const bcrypt = require("bcryptjs");
const getUserByEmail = require("../../service/users/getUserByEmail.js");

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Validation error" });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      subscription: "starter",
    });

    await user.save();

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {signup};
