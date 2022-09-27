const getAll = require("./getAllContacts");
const getById = require("./getContactById");
const addContact = require("./addContact");
const deleteContact = require("./deleteContact");
const changeContact = require("./changeContact");
module.exports = {
  getAll,
  getById,
  addContact,
  deleteContact,
  changeContact,
};
