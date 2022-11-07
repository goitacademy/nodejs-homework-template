const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.SECRET_KEY;
const User = require("../models/user");

const findUserByEmail = async (email) => await User.findOne({ email });

const createNewUser = async (body) => {
  const { name, email, password } = body;
  const newUser = new User({ name, email });
  await newUser.setPassword(password);
  await newUser.save();

  return newUser;
};

const updateUserToken = async (id, token = null) =>
  await User.findByIdAndUpdate(id, { token });

const authenticateUser = async (token) => {
  try {
    const payload = jwt.verify(token, SECRET);
    const { id } = payload;
    const user = await User.findById(id);

    return user.token === token ? user : null;
  } catch (err) {
    return null;
  }
};

const updateUserSubscription = async (id, subscription) => {
  await User.findByIdAndUpdate(id, { subscription });
};

module.exports = {
  findUserByEmail,
  createNewUser,
  updateUserToken,
  authenticateUser,
  updateUserSubscription,
};
