const getContactsListController = require("./getContactsListCtrl");
const getContactByIdController = require("./getContactByIdCtrl");
const createContactController = require("./addContactCtrl");
const removeContactController = require("./removeContactsCtrl");
const updateContactController = require("./updateContactCtrl");
const updateStatusContactController = require("./updateStatusContactCtrl");

module.exports = {
  getContactsListController,
  getContactByIdController,
  createContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
};
