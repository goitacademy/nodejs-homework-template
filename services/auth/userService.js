const { Types } = require('mongoose');
const { AppError } = require('../../utils');
const { signToken, checkToken } = require('./jwtService');
const userRolesEnum = require('../../constants/userRolesEnum');
const User = require('../../models/auth');

/**
 * Check if user exists service.
 * @param {Object} filter
 * @returns {Promise<void>}
 */
exports.userExists = async (filter) => {
  const userExists = await User.exists(filter);

  if (userExists) throw new AppError(409, 'User already exists..');
};

/**
 * Check if user by id exists service.
 * @param {string} id
 * @returns {Promise<void>}
 */
exports.userExistsById = async (id) => {
  const idIsValid = Types.ObjectId.isValid(id);

  if (!idIsValid) throw new AppError(404, 'User does not exist..');

  const userExists = await User.exists({ _id: id });

  if (!userExists) throw new AppError(404, 'User does not exist..');
};

/**
 * Update user data service.
 * @param {string} id
 * @param {Object} userData
 * @returns {Promise<User>}
 */
exports.updateUser = async (id, userData) => {
  const user = await User.findById(id);

  Object.keys(userData).forEach((key) => {
    user[key] = userData[key];
  });

  return user.save();
};

/**
 * Create user service.
 * @param {Object} userData
 * @returns {Promise<User>}
 */
exports.createUser = async (userData) => {
  const newUser = await User.create(userData);

  newUser.password = undefined;

  return newUser;
};

/**
 * Get users service.
 * @returns {Promise<User[]>}
 */
exports.getAllUsers = () => User.find();

/**
 * Get user by id service.
 * @param {string} id
 * @returns {Promise<User>}
 */
exports.getUserById = (id) => User.findById(id);

/**
 * Delete user by id service.
 * @param {string} id
 * @returns {Promise<void>}
 */
exports.deleteUserById = (id) => User.findByIdAndDelete(id);

/**
 * Create user and sign JWT.
 * @param {Object} userData
 * @returns {Object}
 */
exports.signupUser = async (userData) => {
  const newUserData = {
    ...userData,
    role: userRolesEnum.USER,
  };

  const newUser = await User.create(newUserData);

  newUser.password = undefined;

  const token = signToken(newUser.id);

  return { user: newUser, token };
};

/**
 * Check user login data and sign token.
 * @param {Object} loginData
 * @returns {Object}
 */
exports.loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user) throw new AppError(401, 'Not authorized..');

  const passwordIsValid = await user.checkPassword(password, user.password);

  if (!passwordIsValid) throw new AppError(401, 'Not authorized..');

  user.password = undefined;

  const token = signToken(user.id);

  return { user, token };
};

/**
 * Get current user via sign token.
 * @param {Object} token
 * @returns {Object}
 */
exports.getCurrentUser = async (token) => {
  const userId = checkToken(token);

  const user = await User.findById(userId);

  if (!user) throw new AppError(401, 'Not authorized..');

  return { user };
};

/**
 * Logout.
 * @param {Object} token
 * @returns {Object}
 */
exports.logout = async (token) => {
  const userId = checkToken(token);

  const user = await User.findById(userId);

  if (!user) throw new AppError(401, 'Not authorized..');

  return { user };
};
