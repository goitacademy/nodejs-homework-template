const getContacts = require("./getContacts");
const getContactById = require("./getContactsById");
const postContact = require("./postContact");
const deleteContact = require("./deleteContact");
const putContact = require("./putContact");
const updateStatusContact = require("./updateStatusContact");

module.exports = {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  putContact,
  updateStatusContact,
};
