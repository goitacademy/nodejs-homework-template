const { listContactsController } = require("./contacts/listContactsController");
const {
  getContactByIdController,
} = require("./contacts/getContactByIdController");
const { addContactController } = require("./contacts/addContactController");
const {
  removeContactController,
} = require("./contacts/removeContactController");
const {
  updateContactController,
} = require("./contacts/updateContactController");
const {
  updateFavoriteContactController,
} = require("./contacts/updateFavoriteContactController");

module.exports = {
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateFavoriteContactController,
};
