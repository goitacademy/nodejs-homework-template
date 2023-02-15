const { Unauthorized } = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../../model");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized(`Email ${email} not found`);
  }
  const passCompare = bcrypt.compare(password, user.password);
  if (!user.verify || !passCompare) {
    throw new Unauthorized("Email is not verify, or password wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({ token });
};

module.exports = login;
