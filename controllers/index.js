const { getContactsList } = require("./getContactsList");
const { getContactsById } = require("./getContactsById");
const { deleteContact } = require("./deleteContact");
const { createContact } = require("./createContact");
const { changeContact } = require("./changeContact");
const { updateStatusController } = require("./updateStatusContactController");

module.exports = {
  getContactsList,
  getContactsById,
  deleteContact,
  createContact,
  changeContact,
  updateStatusController,
};
