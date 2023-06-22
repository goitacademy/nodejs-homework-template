const listContacts = require("./listContacts");
const getContactById = require("./getByIdContact");
const addContact = require("./addContact");
const removeContact = require("./removeByIdContact");
const updateContactById = require("./updateByIdContact");
const { controllerWrapper } = require("../../utils/index");

module.exports = {
  listContacts: controllerWrapper(listContacts),
  getContactById: controllerWrapper(getContactById),
  addContact: controllerWrapper(addContact),
  removeContact: controllerWrapper(removeContact),
  updateContactById: controllerWrapper(updateContactById),
};
