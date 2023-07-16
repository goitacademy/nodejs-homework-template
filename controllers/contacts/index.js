const ctrlWrapper = require("../../wrappers");
const addContact = require("./addContact");
const deleteContactById = require("./deleteContactById");
const getAllContacts = require("./getAllContacts");
const getContactById = require("./getContactById");
const ubdateContactById = require("./ubdateContactById");
const ubdateFavourite = require("./ubdateFavourite");

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  ubdateContactById: ctrlWrapper(ubdateContactById),
  ubdateFavourite: ctrlWrapper(ubdateFavourite),
  deleteContactById: ctrlWrapper(deleteContactById),
};
