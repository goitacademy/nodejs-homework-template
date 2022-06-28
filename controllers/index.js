const { loginUser, logoutUser, registerUser, confirm, resend } = require("./auth");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
} = require("./contacts");

module.exports =
{
  loginUser,
  logoutUser,
  registerUser,
  confirm,
  resend,
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
};
