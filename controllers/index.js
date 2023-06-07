const getAllContacts = require("./getAllContacts");
const getContact = require("./getContact");
const add = require("./add");
const updateContactById = require("./updateContactById");
const remove = require('./remove')

module.exports = {
  getAllContacts,
  getContact,
  add,
  updateContactById,
  remove
};
