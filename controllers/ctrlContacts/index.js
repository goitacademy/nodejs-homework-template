const getAllContacts = require("./getAllContacts");
const getByIdContact = require("./getByIdContact");
const addContact = require("./addContact");
const updateByIdContact = require("./updateByIdContact");
const deleteByIdContact = require("./deleteByIdContact");
const updateByIdStatusContact = require("./updateByIdStatusContact");

module.exports = {
  getAllContacts,
  getByIdContact,
  addContact,
  updateByIdContact,
  deleteByIdContact,
  updateByIdStatusContact,
};