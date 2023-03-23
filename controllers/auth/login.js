const { User } = require("../../models/userAuth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { RequestError } = require("../../helpers");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(401, "Email or password is wrong");
  }
  const passwordCompare = bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw RequestError(401, "Email or password is wrong");
  }
  const payload = { id: user._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token }); //* Записываем token в базу для Logout
  res.json({
    token,
  });
};

module.exports = login;
