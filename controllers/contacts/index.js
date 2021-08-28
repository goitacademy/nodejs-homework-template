const getAllContacts = require("./getAllContacts");
const getById = require("./getById");
const add = require("./add");
const updateContactById = require("./updateContactById");
const delContactById = require("./delContactById");
const updateStatusContact = require('./updateStatusContact')

module.exports = {
  getAllContacts,
  getById,
  add,
  updateContactById,
  delContactById,
  updateStatusContact
};
