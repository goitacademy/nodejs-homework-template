const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const User = require("../models/user");

const { HttpError, registerSchema } = require("../helpers");

const userRegister = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = registerSchema.validate(req.body);
    if (error) {
      throw HttpError(
        400,
        "Error validation: email or password is not correct"
      );
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
    });
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

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = registerSchema.validate(req.body);
    if (error) {
      throw HttpError(
        400,
        "Error validation: email or password is not correct"
      );
    }
    const userExist = await User.findOne({ email });
    if (!userExist) {
      throw HttpError(401, "Email or password is wrong");
    }

    const isPasswordRight = await bcrypt.compare(password, userExist.password);
    if (!isPasswordRight) {
      throw HttpError(401, "Email or password is wrong");
    }

    const token = jwt.sign({ id: userExist._id }, SECRET_KEY, {
      expiresIn: "23h",
    });
    await User.findByIdAndUpdate(userExist._id, { token });

    res.json({
      token,
      user: {
        email: userExist.email,
        subscription: userExist.subscription,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const userCurrent = (req, res, next) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    email,
    subscription,
  });
};

const userLogout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204);
  } catch (error) {
    next(error);
  }
};

const userUpdateSubscription = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { subscription } = req.body;
    await User.findByIdAndUpdate(
      _id,
      { subscription },
      { runValidators: true }
    );
    res.status(200).json({
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userRegister,
  userLogin,
  userCurrent,
  userLogout,
  userUpdateSubscription,
};