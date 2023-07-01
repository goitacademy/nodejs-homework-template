const listContacts = require("./contacts/listContacts");
const getContactById = require("./contacts/getContactById");
const addContact = require("./contacts/addContact");
const deleteContact = require("./contacts/deleteContact");
const updateContact = require("./contacts/updateContact");
const updateStatusContact = require("./contacts/updateStatusContact");
const register = require("./auth/register");
const ctrlWrapper = require("../helpers/ctrlWrapper");

module.exports = {
  register: ctrlWrapper(register),
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
