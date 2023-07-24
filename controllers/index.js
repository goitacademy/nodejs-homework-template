const { contactList } = require("./contacts/contactList");
const { getContactById } = require("./contacts/getContactById");
const { addContact } = require("./contacts/addContact");
const { updateContact } = require("./contacts/updateContact");
const { updateStatusContact } = require("./contacts/updateStatusContact");
const { removeContact } = require("./contacts/removeContact");
const { register } = require("./auth/register");
const { login } = require("./auth/login");
const { getCurrent } = require("./auth/current");
const { logout } = require("./auth/logout");
const { updateAvatar } = require("./auth/updateAvatar");
const { verifyEmail } = require("./auth/verifyEmail");
const { resendVerifyEmail } = require("./auth/resendVerifyEmail");

module.exports = {
  contactList,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  removeContact,
  register,
  verifyEmail,
  resendVerifyEmail,
  logout,
  getCurrent,
  login,
  updateAvatar,
};
