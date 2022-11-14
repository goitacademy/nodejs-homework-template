const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const User = require("../models/user.model");
const {
  RegistrationConflictError,
  NotAuthorizedError,
} = require("../helpers/errors");

const registration = async (email, password, subscription = "starter") => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    email,
    password: hashedPassword,
    subscription,
  });

  try {
    await user.save();
  } catch (error) {
    console.log(error.message);
    if (error.message.includes("duplicate key error collection")) {
      throw new RegistrationConflictError("Email in use");
    }

    throw RegistrationConflictError;
  }
  return {
    user: {
      email: email,
      subscription: subscription,
    },
  };
};

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotAuthorizedError("Email or password is wrong");
  }

  const isPasswordTheSame = await bcrypt.compare(password, user.password);
  if (!isPasswordTheSame) {
    throw new NotAuthorizedError("Email or password is wrong");
  }

  const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
    expiresIn: "15m",
  });

  user.token = token;
  await User.findByIdAndUpdate(user._id, user);
  return {
    token: user.token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };
};

const logout = async (user) => {
  user.token = null;
  await User.findByIdAndUpdate(user._id, user);

  return {
    ResponseBody: {
      message: "Not authorized",
    },
  };
};

module.exports = {
  registration,
  login,
  logout,
};
