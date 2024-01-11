const { checkUserExists, signup, login, logout, updateSubscription, uploadFile, updateAvatarPath, checkVerificationToken } = require("./authService");
const { signToken, checkToken } = require("./jwtService");
const { getOneUser, getCurrentUser } = require("./userService");
const { getAllContacts, checkedContactByUser } = require("./contactsService");

module.exports = {
  checkVerificationToken,
  checkUserExists,
  signup,
  updateAvatarPath,
  login,
  uploadFile,
  logout,
  signToken,
  checkToken,
  getOneUser,
  getAllContacts,
  updateSubscription,
  checkedContactByUser,
  getCurrentUser,
};
