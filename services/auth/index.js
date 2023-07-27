const { signToken, checkToken } = require('./jwtService');
const {
  userExistsById,
  updateUser,
  createUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  signupUserm,
  loginUser,
  getCurrentUser,
  logout,
} = require('./userService');

module.exports = {
  signToken,
  checkToken,
  userExistsById,
  updateUser,
  createUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  signupUserm,
  loginUser,
  getCurrentUser,
  logout,
};
