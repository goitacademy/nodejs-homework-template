const getContacts = require("./getContacts");
const checkByID = require("./checkByID");
const createContact = require("./createContact");
const deleteContact = require("./deleteContact");
const changeContact = require("./changeContact");
const updateFavoriteContact = require("./updateFavoriteContact");

module.exports = {
  getContacts,
  checkByID,
  createContact,
  deleteContact,
  changeContact,
  updateFavoriteContact,
};
