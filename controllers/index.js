const {
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateFavoriteContactController,
} = require("./contacts");

const { signup, signin, getCurrent, signout } = require("./auth");

module.exports = {
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateFavoriteContactController,
  signup,
  signin,
  getCurrent,
  signout,
};
