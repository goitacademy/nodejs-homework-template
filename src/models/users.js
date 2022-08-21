const { User } = require("../db/usersSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Conflict, Unauthorized, InternalServerError } = require("http-errors");

const addUser = async (body) => {
  if (await User.findOne({ email: body.email })) {
    throw new Conflict("Email in use");
  }
  try {
    const user = new User(body);
    await user.save();
    return user;
  } catch (error) {
    throw new InternalServerError("Server error");
  }
};

const loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Unauthorized("Email or password is wrong");
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new Unauthorized("Email or password is wrong");
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
    throw new InternalServerError("Server error");
  }
};

const logOut = async (userId) => {
  try {
    const user = await User.findById(userId);
    await user.setToken(null);
    await user.save();
    return user;
  } catch (err) {
    throw new Unauthorized("Not authorized");
  }
};

const getUser = async (userId) => {
  try {
    return User.findById(userId);
  } catch (err) {
    throw new Unauthorized("Not authorized");
  }
};

const updateUserSubscription = async (body, userId) => {
  try {
    return User.findByIdAndUpdate(userId, body, {
      new: true,
    });
  } catch (err) {
    throw new Unauthorized("Not authorized");
  }
};

module.exports = {
  addUser,
  loginUser,
  logOut,
  getUser,
  updateUserSubscription,
};
