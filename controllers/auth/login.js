const { Unauthorized } = require("http-errors");
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized("Email is wrong");
  }
  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    throw new Unauthorized("Password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, {token})

  res.json({
    token,
  });
};
module.exports = login;
