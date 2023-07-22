const { controllerWrapper } = require("../helper");

const getContacts = require("./getContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const deleteContatcById = require("./deleteContatcById");
const updateContact = require("./updateContact");
const updateStatusContact = require("./updateStatusContact");

module.exports = {
  getContacts: controllerWrapper(getContacts),
  getContactById: controllerWrapper(getContactById),
  addContact: controllerWrapper(addContact),
  deleteContatcById: controllerWrapper(deleteContatcById),
  updateContact: controllerWrapper(updateContact),
  updateStatusContact: controllerWrapper(updateStatusContact),
};
