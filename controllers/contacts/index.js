const getListContacts = require("./getListContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const updateContactById = require("./updateContactById");
const updateStatusContact = require("./updateStatusContact");
const removeContactById = require("./removeContactById");


module.exports = {
  getListContacts,
  getContactById,
  addContact,
  updateContactById,
  updateStatusContact,
  removeContactById,
};
