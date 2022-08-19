const { User } = require("../db/usersSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const addUser = async (body) => {
  try {
    const user = new User(body);
    await user.save();
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("email alredy used");
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error({ message: "wrong password" });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.SECRET
    );
    await user.setToken(token);
    await user.save();
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

const logOut = async (userId) => {
  try {
    const user = await User.findById(userId);
    await user.setToken(null);
    await user.save();
  } catch (err) {
    throw new Error(err.message);
  }
};

const getUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  addUser,
  loginUser,
  logOut,
  getUser,
};
