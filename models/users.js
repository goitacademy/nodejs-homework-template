const { User } = require("./user.model");
const { Conflict } = require("http-errors");

const createUser = async (email, password) => {
  const user = new User({ email, password });
  try {
    await user.save();
  } catch (error) {
    if (error.message.includes("duplicate key error collection")) {
      throw new Conflict("User with this email already registered");
    }
    throw error;
  }
  return user;
};

module.exports = {
  createUser,
};
