const {
  createContact,
  deleteContact,
  favoriteChange,
  getAllContacts,
  getContact,
  updateContacts,
} = require("./contacts");

const {
  register,
  login,
  changeSubscription,
  currentUser,
  logoutUser,
  changeUserAvatar,
  reVerificationOfEmail,
  verifyEmail,
} = require("./authController");

module.exports = {
  favoriteChange,
  createContact,
  deleteContact,
  updateContacts,
  getContact,
  getAllContacts,
  register,
  login,
  changeSubscription,
  currentUser,
  logoutUser,
  changeUserAvatar,
  reVerificationOfEmail,
  verifyEmail,
};
