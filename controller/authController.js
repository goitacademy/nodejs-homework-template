import User from '../models/user.js';

import HttpError from '../helpers/HttpError.js';

import userSchemas from '../helpers/user-shemas.js';

import bcryptjs from "bcryptjs";

import jwt from "jsonwebtoken";

import "dotenv/config";

const { JWT_SECRET } = process.env;

const signup = async (req, res, next) => {
  const { error } = userSchemas.userSignupSchema.validate(req.body);
  if (error) {
    return next(HttpError(400, error.message));
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return next(HttpError(409, "Email in use"));
  }

  const hashPassword = await bcryptjs.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const signin = async (req, res, next) => {
  const { error } = userSchemas.userSigninSchema.validate(req.body);
  if (error) {
    return next(HttpError(400, error.message));
    
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(HttpError(401, "Email or password invalid"));
  }

  const passwordCompare = await bcryptjs.compare(password, user.password);
  
  if (!passwordCompare) {
    return next(HttpError(401, "Email or password invalid"));
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = (req, res) => {
  const { subscription, email } = req.user;
  res.json({
    email,
    subscription
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({
    message: "Logout success",
  });
};

export default {
    signup,
    signin,
    getCurrent,
    logout
};
