import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { HttpError } from "../utils/helpers/HttpError.js";
import authenticate from "../utils/middlewares/authenticate.js";

const { JWT_SECRET } = process.env;

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return next(HttpError(409, "Email already exist"));
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(HttpError(401, "Email or password is wrong"));
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return next(HttpError(401, "Email or password is wrong"));
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    next(error);
  }
};

const getCurrent = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.json({ email, subscription });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

const subscription = async (req, res, next) => {
  try {
    const { email } = req.user;
    const result = await User.findOneAndUpdate({ email }, req.body);
    res.json({
      email: result.email,
      subscription: result.subscription,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  getCurrent,
  logout,
  subscription,
};
