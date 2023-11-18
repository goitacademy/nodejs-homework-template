import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../models/user.js";
import { HttpError } from "../helpers/HttpError.js";

const { SECRET_KEY } = process.env;

export const register = async (req, res, next) => {
  const { password, email } = req.body;

  const generateToken = async (newUser, statusCode, res) => {
    const user = await User.findOne({ email });

    if (!user) throw HttpError(401, "Email or password is wrong");

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.status(statusCode).json({
      status: "success",
      code: statusCode,
      data: {
        user: {
          email: newUser.email,
          subscription: newUser.subscription,
        },
        token,
      },
    });
  };

  try {
    const user = await User.findOne({ email }).exec();

    if (user) throw HttpError(409, "Email in use");

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      ...req.body,
      password: passwordHash,
    });

    generateToken(newUser, 201, res);

    // res.status(201).json({
    //   status: 'success',
    //   code: 201,
    //   data: {
    //     user: {
    //       email: newUser.email,
    //       subscription: newUser.subscription,
    //     },
    //   },
    // });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (!user) throw HttpError(401, "Email or password is wrong");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw HttpError(401, "Email or password is wrong");

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    // add token to the user
    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};

export const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });

  res.status(204).send();
};

export async function updateSubscription(req, res, next) {
  const { _id: user } = req.user;

  const userSubscription = await User.findByIdAndUpdate(user, req.body, {
    new: true,
  });

  if (!userSubscription) return next();

  const { email, subscription } = userSubscription;

  res.status(200).json({
    status: "success",
    code: 201,
    data: {
      user: {
        id: user,
        email,
        subscription,
      },
    },
  });
}
