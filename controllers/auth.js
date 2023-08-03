import { User } from "../models/index.js";
import { HttpError } from "../helpters/index.js";
import { userSchema } from "../schemas/userSchema.js";
import "dotenv/config";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = userSchema.validate(req.body);

    if (!password || password.length < 6) {
      throw HttpError(400, "Password must contain at least 6 characters");
    }

    if (error) {
      throw HttpError(400);
    }

    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409);
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = userSchema.validate(req.body);

    if (error) {
      throw HttpError(400);
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw HttpError(401);
    }

    const passwordCompare = await bcryptjs.compare(password, user.password);

    if (!passwordCompare) {
      throw HttpError(401);
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await User.findOneAndUpdate(user._id, { token });

    res.json({ token });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  const { _id } = req.user;

  const user = await User.findById(_id);

  if (!user) {
    throw HttpError(401, "Not authorized");
  }

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204);
};

const getCurrent = async (req, res, next) => {
  const { _id } = req.user;

  const user = await User.findById(_id);

  if (!user) {
    throw HttpError(401, "Not authorized");
  }

  res.json({
    email: user.email,
    subscriprion: user.subscription,
  });
};

const updateStatusSubscription = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { subscription } = req.body;

    const user = await User.findByIdAndUpdate(_id, { subscription });

    if (!user) {
      throw HttpError(401, "Not authorized");
    }

    res.json({
      user: {
        email: user.email,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default { signup, login, logout, getCurrent, updateStatusSubscription };
