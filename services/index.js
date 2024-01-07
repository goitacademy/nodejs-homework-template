const { checkUserExists, signup, login, logout, updateSubscription, uploadFile, updateAvatarPath } = require("./authService");
const { signToken, checkToken } = require("./jwtService");
const { getOneUser } = require("./userService");
const { getAllContacts, checkedContactByUser } = require("./contactsService");

module.exports = {
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
};
