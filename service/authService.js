const bcrypt = require("bcrypt");

// const { JWT_SECRET } = process.env;

const User = require("../models/user.model");
const {
  RegistrationConflictError,
  // NotAuthorizedError,
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
    if (error.message.includes("duplicate key error collection")) {
      throw new RegistrationConflictError("Email in use");
    }

    throw error;
  }
  return {
    user: {
      email: email,
      subscription: subscription,
    },
  };
};

const login = async () => {};

module.exports = {
  registration,
  login,
};
