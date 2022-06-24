const { loginUser, logoutUser, registerUser } = require("./auth");

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
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
};
