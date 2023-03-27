const { compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { User } = require("../models/userModel");
const { url } = require("gravatar");
const { HttpError } = require("../helpers/httpError");

const { JWT_SECRET } = process.env;

const registration = async ({ email, password, subscription }) => {
  const avatarURL = url(email).slice(2);

  const user = await User.findOne({ email });

  if (user) throw new HttpError(409, `Email: '${email}' in use`);

  const newUser = new User({ email, password, subscription, avatarURL });
  await newUser.save();

  return newUser;
};

const logIn = async (email, password) => {
  const user = await User.findOne({ email });

  const { _id, createdAt, subscription, avatarURL } = user;

  if (!user) throw new HttpError(401, `No user with email: '${email}' found`);

  if (!(await compare(password, user.password)))
    throw new HttpError(401, `Wrong password`);

  const token = sign({ _id, createdAt }, JWT_SECRET);

  await User.findByIdAndUpdate({ _id }, { token }, { new: true });

  return {
    token,
    user: { email, subscription, avatarURL },
  };
};

const logOut = async (_id) => {
  return await User.findOneAndUpdate({ _id }, { token: null });
};

module.exports = {
  registration,
  logIn,
  logOut,
};
