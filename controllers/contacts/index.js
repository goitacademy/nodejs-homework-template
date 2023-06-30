const listContacts = require("./listContacts");
const getByIdContact = require("./getByIdContact");
const addContact = require("./addContact");
const removeContact = require("./removeByIdContact");
const updateContactById = require("./updateByIdContact");
const getByIdContactFavorite = require("./getByIdContactFavorite");
const updateStatusContact = require("./updateStatusContact");
const { controllerWrapper } = require("../../utils/index");

module.exports = {
  listContacts: controllerWrapper(listContacts),
  getContactById: controllerWrapper(getByIdContact),
  addContact: controllerWrapper(addContact),
  removeContact: controllerWrapper(removeContact),
  updateContactById: controllerWrapper(updateContactById),
  getByIdContactFavorite: controllerWrapper(getByIdContactFavorite),
  updateStatusContact: controllerWrapper(updateStatusContact),
};
