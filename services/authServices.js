const { compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { User } = require("../models/userModel");
const { HttpError } = require("../helpers/httpError");

const { JWT_SECRET } = process.env;

const registration = async (email, password) => {
  const user = await User.findOne({ email });

  if (user) {
    throw new HttpError(409, `Email: '${email}' in use`);
  }

  const newUser = new User({ email, password });
  await newUser.save();
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  const subscription = user.subscription;

  if (!user) {
    throw new HttpError(401, `No user with email: '${email}' found`);
  }

  if (!(await compare(password, user.password))) {
    throw new HttpError(401, `Wrong password`);
  }

  const token = sign(
    {
      _id: user._id,
      createdAt: user.createdAt,
    },
    JWT_SECRET
  );

  return { token, subscription };
};

module.exports = {
  registration,
  login,
};
