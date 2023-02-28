const getAllContacts = require("./getAllContacts");
const getContactId = require("./getContactId");
const postContact = require("./postContact");
const putContacts = require("./putContacts");
const deleteContact = require("./deleteContact");
const updateContact = require("./patchContact");

module.exports = {
  getAllContacts,
  getContactId,
  postContact,
  putContacts,
  deleteContact,
  updateContact,
};
