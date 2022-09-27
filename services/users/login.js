const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { RequestError } = require("../../helpers");

const secret = process.env.SECRET;

const login = async (password, email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(401, "Email or password is wrong.");
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw RequestError(401, "Email or password is wrong.");
  }

  const token = await jwt.sign({ id: user._id, email }, secret, {
    expiresIn: "1d",
  });

  await User.updateOne({ _id: user._id }, { $set: { token } });

  return {
    token,
    user: { email: user.email, subscription: user.subscription },
  };
};

module.exports = login;
