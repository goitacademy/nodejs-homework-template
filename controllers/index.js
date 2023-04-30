const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateById,
  updateStatusContact,
} = require("./contacts");

const {
  register,
  login,
  getCurrent,
  logout,
  resendVerifyEmail,
  updateAvatar,
  verifyEmail,
} = require("./auth");

module.exports = {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateById,
  updateStatusContact,
  register,
  login,
  getCurrent,
  logout,
  resendVerifyEmail,
  updateAvatar,
  verifyEmail,
};
