/** @format */
require("dotenv").config();
const User = require("../../models/user");
const { RequestError } = require("../../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, "Email is not valid");
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw RequestError(401, "Password is not valid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "10d" });

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
        email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
