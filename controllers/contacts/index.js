const { listContactsController } = require("./listContactsController");
const { getContactByIdController } = require("./getContactByIdController");
const { addContactController } = require("./addContactController");
const { removeContactController } = require("./removeContactController");
const { updateContactController } = require("./updateContactController");
const {
  updateFavoriteContactController,
} = require("./updateFavoriteContactController");

module.exports = {
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateFavoriteContactController,
};
