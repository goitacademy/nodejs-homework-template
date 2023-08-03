const {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  putContact,
  patchContactFavorite,
} = require("./contacts");

const {
  userRegister,
  userLogin,
  userCurrent,
  userLogout,
  userUpdateSubscription,
} = require("./users");

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  putContact,
  patchContactFavorite,
  userRegister,
  userLogin,
  userCurrent,
  userLogout,
  userUpdateSubscription,
};