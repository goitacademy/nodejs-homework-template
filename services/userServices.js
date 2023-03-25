const { compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { User } = require("../models/userModel");
const { HttpError } = require("../helpers/httpError");

const { JWT_SECRET } = process.env;

const registration = async ({ email, password, subscription }) => {
  const user = await User.findOne({ email });

  if (user) throw new HttpError(409, `Email: '${email}' in use`);

  const newUser = new User({ email, password, subscription });
  await newUser.save();

  return newUser;
};

const logIn = async (email, password) => {
  const user = await User.findOne({ email });

  const { _id, createdAt, subscription } = user;

  if (!user) throw new HttpError(401, `No user with email: '${email}' found`);

  if (!(await compare(password, user.password)))
    throw new HttpError(401, `Wrong password`);

  const token = sign({ _id, createdAt }, JWT_SECRET);

  await User.findByIdAndUpdate({ _id }, { token });

  return {
    token,
    user: { email, subscription },
  };
};

const logOut = async (_id) => {
  return await User.findOneAndUpdate({ _id }, { token: null });
};

const currentUser = async (_id) => {
  return await User.findOne({ _id }, { _id: 0, email: 1, subscription: 1 });
};

const changeUserSubscription = async (_id, subscription) => {
  return await User.findByIdAndUpdate({ _id }, subscription, {
    new: true,
    fields: {
      _id: 0,
      password: 0,
      token: 0,
    },
  });
};

module.exports = {
  registration,
  logIn,
  logOut,
  currentUser,
  changeUserSubscription,
};
