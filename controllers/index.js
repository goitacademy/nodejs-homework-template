const {
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateFavoriteContactController,
} = require("./contacts");

const { signup, signin } = require("./auth");

module.exports = {
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateFavoriteContactController,
  signup,
  signin,
};
