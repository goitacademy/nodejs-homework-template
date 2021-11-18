const getContacts = require("./getContacts");
const getOneContact = require("./getOneContact");
const contactAdd = require("./contactAdd");
const updateContactById = require("./updateOneContact");
const deleteContact = require("./deleteContact");
const updateStatusContact = require("./updateStatusContact");

module.exports = {
  getContacts,
  getOneContact,
  updateContactById,
  deleteContact,
  contactAdd,
  updateStatusContact,
};
