import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

import { HttpError } from "../helpers/index.js";

import { userSignupSchema, userSigninSchema } from "../models/User.js";

const { JWT_SECRET } = process.env;

const signup = async (req, res, next) => {
    try{
    const { email, password } = req.body;
    const { error } = userSignupSchema.validate(req.body);

    const user = await User.findOne({ email });

      if (error) {
      throw HttpError(400, error.message);
    }

    if (user) {
        throw HttpError(409, "Email already in use");
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
        const { email, password } = req.body;
        const { error } = userSigninSchema.validate(req.body);

        const user = await User.findOne({ email });

        if (error) {
            throw HttpError(400, error.message);
        }

        if (!user) {
            throw HttpError(401, "Email or password is wrong");
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            throw HttpError(401, "Email or password is wrong");
        }

        const { _id: id } = user;
        const payload = {
            id,
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
        await User.findByIdAndUpdate(id, { token });
        res.json({
            token,
            user: {
                email: user.email,
                subscription: user.subscription,
            },
        });
    }
    catch (error) {
        next(error);
    }
};

const getCurrent = async (req, res, next) => {
    try {
        const { email, subscription } = req.user;
        res.json({
            email,
            subscription,
        });
    }
    catch (error) {
        next(error);
    }
     
};

const signout = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};


export default {
    signup,
    signin,
    getCurrent,
    signout,
};