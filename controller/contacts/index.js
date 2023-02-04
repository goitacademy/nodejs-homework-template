const getAllContactsController = require("./getAllContactsController");
const getContactsByIdController = require("./getContactByIdController");
const addContactController = require("./addContactController");
const removeContactController = require("./removeContactController");
const updateContactController = require("./updateContactController");
const changeFavouriteStatusController = require("./changeFavouriteStatusController");

module.exports = {
  getAllContactsController,
  getContactsByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  changeFavouriteStatusController,
};
