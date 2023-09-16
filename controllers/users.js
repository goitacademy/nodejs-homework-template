const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { HttpError, controllerWrapper } = require('../helpers');

const { SECRET_KEY } = process.env;

/**
 * Registers a new user with the provided email and password.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {HttpError} 409 if email is already in use
 * @returns {Object} JSON response containing the newly registered user's email and subscription
 */
const registerUser = async (req, res) => {
  const { email, password } = req.body;
  // Check if the email is already in use
  const user = await User.findOne({ email });
  if (user) {
    throw new HttpError(409, 'Email in use');
  }

  // Hash the provided password
  const hashPassword = await bcrypt.hash(password, 10);

  // Create a new user with the hashed password
  const newUser = await User.create({ ...req.body, password: hashPassword });

  // Respond with the newly registered user's email and subscription
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

/**
 * Logs in a user with the provided email and password.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {HttpError} 401 if email or password is wrong
 * @returns {Object} JSON response containing an authentication token and user data
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });

  // If the user doesn't exist, respond with a 401 error
  if (!user) {
    throw new HttpError(401, 'Email or password is wrong');
  }

  // Compare the provided password with the hashed password in the database
  const passwordCompare = await bcrypt.compare(password, user.password);

  // If the passwords don't match, respond with a 401 error
  if (!passwordCompare) {
    throw new HttpError(401, 'Email or password is wrong');
  }

  // Create a JWT payload with the user's ID
  const payload = {
    id: user._id,
  };

  // Sign the payload with the secret key and set an expiration time
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

  // Update the user's token in the database
  await User.findByIdAndUpdate(user._id, { token });

  // Respond with the authentication token and user data
  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

/**
 * Logs out the currently authenticated user by removing their token.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response indicating successful logout
 */
const logoutUser = async (req, res) => {
  const { _id } = req.user;

  // Remove the user's token by setting it to null
  await User.findByIdAndUpdate(_id, { token: null });

  // Respond with a success message
  res.status(204).json({ message: 'No content' });
};

/**
 * Retrieves the information of the currently authenticated user.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response containing the user's email and subscription
 */
const getCurrentUser = async (req, res) => {
  const { email, subscription } = req.user;

  // Respond with the user's email and subscription
  res.status(200).json({ email, subscription });
};

/**
 * Updates the subscription of the currently authenticated user.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response containing the updated user data
 */
const updateSubscriptionUser = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  // Update the user's subscription and retrieve the updated user data
  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  // Respond with the updated user data
  res.status(200).json(result);
};

module.exports = {
  registerUser: controllerWrapper(registerUser),
  loginUser: controllerWrapper(loginUser),
  logoutUser: controllerWrapper(logoutUser),
  getCurrentUser: controllerWrapper(getCurrentUser),
  updateSubscriptionUser: controllerWrapper(updateSubscriptionUser),
};

// This code defines a set of controller functions for user registration, login, logout, retrieving the current user's information, and updating the user's subscription status. These functions are wrapped in error handling logic, and they interact with the User model and use JWT for authentication. In case of errors, appropriate HTTP status codes and error messages are returned in the responses.
