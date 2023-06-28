const listContacts = require("./listContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const removeContact = require("./removeContactById");
const updateContactById = require("./updateContactById");
const { ControllerWrapper } = require("../../utils/index");
const updateStatusContact = require("./updateStatusContact");

module.exports = {
  listContacts: ControllerWrapper(listContacts),
  getContactById: ControllerWrapper(getContactById),
  removeContact: ControllerWrapper(removeContact),
  addContact: ControllerWrapper(addContact),
  updateContactById: ControllerWrapper(updateContactById),
  updateStatusContact: ControllerWrapper(updateStatusContact),
};
