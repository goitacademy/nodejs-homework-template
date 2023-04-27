const { controllerWraper } = require("../../helpers");

const getListContacts = require("./getListContacts");
const addContact = require("./addContact");
const getContactById = require("./getContactById");
const removeContact = require("./removeContact");
const updateContact = require("./updateContact");
const updateStatusContact = require("./updateStatusContact");

module.exports = {
  getListContacts: controllerWraper(getListContacts),
  getContactById: controllerWraper(getContactById),
  addContact: controllerWraper(addContact),
  removeContact: controllerWraper(removeContact),
  updateContact: controllerWraper(updateContact),
  updateStatusContact: controllerWraper(updateStatusContact),
};