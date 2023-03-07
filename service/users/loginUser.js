const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { RequestError } = require("../../helpers");

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, `Email or password is wrong`);
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw RequestError(401, `Email or password is wrong `);
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
  const data = await User.findByIdAndUpdate(user._id, { token }, { new: true });
  return data;
};

module.exports = loginUser;
