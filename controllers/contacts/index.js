const listContactsController = require("./listContactsController");
const getContactByIdController = require("./getContactByIdController");
const removeContactController = require("./removeContactController");
const addContactController = require("./addContactController");
const updateByIdController = require("./updateByIdController");
const updateFavoriteController = require("./updateFavoriteController");

module.exports = {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateByIdController,
  updateFavoriteController,
};
