const {
  getListContacts,
  getContactByID,
  addNewContact,
  deleteContact,
  changeContact,
  updateStatusContact,
} = require("./contacts");

const {
  register,
  verifyEmail,
  resendVerifyEmail,
  login,
  getCurrent,
  logout,
  updateUserSub,
  updateAvatar,
} = require("./users");

module.exports = {
  getListContacts,
  getContactByID,
  addNewContact,
  deleteContact,
  changeContact,
  updateStatusContact,
  register,
  verifyEmail,
  resendVerifyEmail,
  login,
  getCurrent,
  logout,
  updateUserSub,
  updateAvatar,
};
