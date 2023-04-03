const { User } = require("../models/user");
const { hashPassword } = require("../models/user.js");

const createUser = async (email, password) => {
  const hashedPassword = hashPassword(password);

  try {
    const user = new User({
      email,
      password: hashedPassword,
    });
    user.save();
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

const updateUser = async (token) => {
  const updatedUser = await User.findByIdAndUpdate(token);
  return updatedUser;
};

module.exports = { createUser, getUserByEmail, updateUser };
