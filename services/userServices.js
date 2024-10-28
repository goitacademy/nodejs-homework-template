const User = require("../models/UsersShema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;

// Register a new user
const registerUser = async (email, password) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email in use");
  }

  const user = new User({ email, password });
  user.setPassword(password);

  const token = jwt.sign({ email }, secret, { expiresIn: "1h" });

  user.token = token;

  await user.save();
  return user;
};

// Login a user
const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    throw new Error("Email or password is wrong");
  }

  const payload = { id: user._id, email: user.email };
  console.log(payload);

  const token = jwt.sign(payload, secret, {
    expiresIn: "1h",
  });

  user.token = token;
  await user.save();

  return { token, user };
};

// Get user by ID
const getUserById = async (userId) => {
  return await User.findById(userId);
};

// Logout user
const logoutUser = async (userId) => {
  const loggedOutUser = await User.findByIdAndUpdate(
    userId,
    { $set: { token: null } }, // Set the token field to null
    { new: true }
  );

  return loggedOutUser;
};

// Update user subscription
const updateSubscription = async (userId, { subscription }) => {
  const isValidSubscription = (subscription) => {
    const validSubscriptions = ["starter", "pro", "business"];
    return validSubscriptions.includes(subscription);
  };

  if (!isValidSubscription(subscription)) {
    throw new Error("Invalid subscription type");
  }

  const updatedSubscriptionUser = await User.findByIdAndUpdate(
    userId,
    { $set: { subscription: subscription } },
    { new: true }
  );

  console.log(updatedSubscriptionUser);

  return updatedSubscriptionUser;
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  logoutUser,
  updateSubscription,
};
