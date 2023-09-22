const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HttpError = require("../helpers/HttpError");
const { User } = require("../schemas/ValidateAuth");
const { SECRET_KEY } = require("../constants/env");

const ifIsResult = (result) => {
  if (!result) {
    throw HttpError(404);
  }
};

const registerUserInDB = async (body) => {
  const { email, password } = body;
  const IfTakenEmail = await User.findOne({ email });
  if (IfTakenEmail) {
    throw HttpError(409, "Email is already taken");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...body,
    password: hashedPassword,
  });
  ifIsResult(newUser);
  return newUser;
};

const loginUserInDB = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }
  const token = jwt.sign({ id: user._id }, SECRET_KEY, {
    expiresIn: "24h",
  });
  await User.findByIdAndUpdate(user._id, { token });
  const result = { token, user: { email, subscription: user.subscription } };
  return result;
};

const logoutFromDB = async (user) => {
  const { _id } = user;
    const result = await User.findByIdAndUpdate(_id, { token: "" });
    return result
};

module.exports = {
  registerUserInDB,
  loginUserInDB,
  logoutFromDB,
};
