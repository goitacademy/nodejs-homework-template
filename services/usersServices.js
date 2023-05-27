const User = require("../models/user");
const { HttpError } = require("../utils/errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const createUserService = async (data) => {
  const { email } = data;

  const user = await User.findOne({ email });

  if (user !== null) {
    throw new HttpError(409, "Email in use");
  }

  return await User.create(data);
};

const loginService = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (user === null) {
    throw new HttpError(401, "Email or password is wrong");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new HttpError(401, "Email or password is wrong");
  }

  const payload = {
    _id: user._id,
    email: user.email,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

  console.log("Token is saved");

  return await User.findOneAndUpdate({ email }, { token }, { new: true });
};

module.exports = {
  createUserService,
  loginService,
};
