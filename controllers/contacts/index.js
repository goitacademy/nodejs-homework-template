const getAll = require("./getAllContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const deleteContact = require("./deleteContact");
const changeContact = require("./changeContact");
module.exports = {
  getAll,
  getContactById,
  addContact,
  deleteContact,
  changeContact,
};
