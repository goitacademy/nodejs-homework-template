import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/User.js";
import { HttpError } from "../helpers/index.js";
import { userSignupSchema, userSigninSchema } from "../models/User.js";

dotenv.config();
const { JWT_SECRET } = process.env;

const signup = async (req, res, next) => {
  try {
    const { error } = userSignupSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email in use");
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

const signin = async (req, res, next) => {
  try {
    const { error } = userSigninSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }
    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      token,
      user: {
        email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    email,
    subscription,
  });
};
const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({});
};

export default {
  signup,
  signin,
  getCurrent,
  signout,
};

// http://localhost:3000/api/auth/signin
// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjcyN2YzNDZhMTNkMzVhYWE1OWUwMCIsImlhdCI6MTcwMTI4MTY2NywiZXhwIjoxNzAxMzY0NDY3fQ.eeWhAeCSkp1GQbNDvaIm6IndSkj_ihylIKrh7Ks0Qvo"

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjcyN2YzNDZhMTNkMzVhYWE1OWUwMCIsImlhdCI6MTcwMTI4MTY2NywiZXhwIjoxNzAxMzY0NDY3fQ.eeWhAeCSkp1GQbNDvaIm6IndSkj_ihylIKrh7Ks0Qvo

// res.status(201).json({
//   username: newUser.username,
//   email: newUser.email,
// });

// const ctrlWrapper = ctrl => {
//     const func = async(req, res, next)=> {
//         try {
//             await ctrl(req, res, next);
//         }
//         catch(error) {
//             next(error);
//         }
//     }
//     return func;
// }
