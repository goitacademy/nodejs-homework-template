const User = require("./user.model");

class DuplicatedEmailError extends Error {
  constructor() {
    super("Email in use");
  }
}

class UnknownDatabaseError extends Error {
  constructor() {
    super("Oops, something went wrong at database layer.");
  }
}

const createUser = async (userData) => {
  try {
    return await User.create(userData);
  } catch (e) {
    console.error(e);

    if (e.code === 11000) {
      const [[key, value]] = Object.entries(e.keyValue);
      throw new DuplicatedEmailError(key, value);
    }

    throw new UnknownDatabaseError();
  }
};

const getUser = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (e) {
    console.error(e);
    throw new UnknownDatabaseError();
  }
};

const updateUser = async (email, userData) => {
  try {
    return await User.findOneAndUpdate({ email }, userData);
  } catch (e) {
    console.error(e);
    throw new UnknownDatabaseError();
  }
};

const updateUserById = async (_id, userData) => {
  try {
    return await User.findOneAndUpdate({ _id }, userData);
  } catch (e) {
    console.error(e);
    throw new UnknownDatabaseError();
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  DuplicatedEmailError,
  UnknownDatabaseError,
  updateUserById,
};
