const getContacts = require("./getContacts");
const getOneContact = require("./getOneContact");
const contactAdd = require("./contactAdd");
const updateContactById = require("./updateOneContact");
const deleteContact = require("./deleteContact");

module.exports = {
  getContacts,
  getOneContact,
  updateContactById,
  deleteContact,
  contactAdd,
};
