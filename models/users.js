const bcrypt = require("bcrypt");
const User = require("../service/schemas/users.js");

const getAllUsers = async () => {
  try {
    return await User.find();
  } catch (err) {
    console.log("Error getting user list: ", err);
    throw err;
  }
};

const getUser = async (id) => {
  try {
    return await User.findById(id);
  } catch (err) {
    console.log("Error getting user list: ", err);
    throw err;
  }
};

const addUser = async (body) => {
  const { email, password } = body;
  const users = await User.find();
  const userExist = users.find((user) => user.email === email);
  if (userExist) return 409;
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = { ...body, password: hashedPassword };
    await User.create(user);
    return user;
  } catch (err) {
    console.log("Error adding new user: ", err);
    throw err;
  }
};

const loginUser = async (body) => {
  const { email, password } = body;
  const users = await User.find();
  const user = users.find((user) => user.email === email);
  if (!user) return false;
  try {
    const isUser = await bcrypt.compare(password, user.password);
    if (!isUser) return false;
    return user;
  } catch (err) {
    console.log("Error adding new user: ", err);
    throw err;
  }
};

const patchUser = async (subscription, userId) => {
  const availableSubscriptions = User.schema.path("subscription").enumValues;
  if (!subscription || !availableSubscriptions.includes(subscription)) {
    return 400;
  }
  try {
    return await User.findByIdAndUpdate(
      { _id: userId },
      { $set: { subscription: subscription } },
      { new: true, select: "email subscription" }
    );
  } catch (err) {
    console.error("An error occurred while updating user: ", err);
    throw err;
  }
};

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  loginUser,
  patchUser,
};
