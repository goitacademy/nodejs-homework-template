const getAllContacts = require("./getAllContacts");
const getContact = require("./getContact");
const createContact = require("./createContact");
const deleteContact = require("./deleteContact");
const updateContactData = require("./updateContactData");
const updateContactStatus = require("./updateContactStatus");
const updateContactFavorite = require("./updateContactFavorite");

module.exports = {
  getAllContacts,
  getContact,
  createContact,
  deleteContact,
  updateContactData,
  updateContactStatus,
  updateContactFavorite,
};
