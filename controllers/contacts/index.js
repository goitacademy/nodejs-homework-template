const getContactsListController = require("./getContactsListController");
const getContactByIdController = require("./getContactByIdController");
const createContactController = require("./createContactController");
const updateContactByIdController = require("./updateContactByIdController");
const removeContactByIdController = require("./removeContactByIdController");
const updateStatusContactController = require("./updateStatusContactController");

module.exports = {
  getContactsListController,
  getContactByIdController,
  createContactController,
  updateContactByIdController,
  removeContactByIdController,
  updateStatusContactController,
};
