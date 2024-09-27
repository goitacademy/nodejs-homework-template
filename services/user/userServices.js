const { Types } = require('mongoose');
const crypto = require('crypto');

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
  const { name, ...restUserData } = userData;
  const newUserData = {
    ...restUserData,
    name: userNameHandler(name),
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

  if (!user || !password) throw new AppError(401, 'Not authorized..');

  const passwordIsValid = await user.checkPassword(password, user.password);

  if (!passwordIsValid) throw new AppError(401, 'Not authorized..');

  user.password = undefined;

  const token = signToken(user.id);

  return { user, token };
};

/**
 * Check current password and save new password.
 * @param {string} userId
 * @param {string} currentPassword
 * @param {string} newPassword
 */
exports.checkUserPassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId).select('password');

  if (!(await user.checkPassword(currentPassword, user.password))) {
    throw new AppError(401, 'Current password wrong..');
  }

  user.password = newPassword;

  await user.save();
};

/**
 * Find user by email.
 * @param {string} email - user email
 * @returns {Promise<User>}
 */

exports.getUserByEmail = (email) => User.findOne({ email });

exports.resetPassword = async (otp, password) => {
  //hash token > it`s formula to hashed
  const hashedToken = crypto.createHash('sha256').update(otp).digest('hex');

  //find user with token, check token not overdue
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  if (!user) throw new AppError(400, 'Token is invalid..');

  //rewrite new password & reset
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  //for non-return password to response, return new user 'clean'
  user.password = undefined;

  return user;
};