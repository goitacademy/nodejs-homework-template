const { ctrlWrapper } = require("../helpers");

const getAllContacts = require("./getAllContacts");
const getContact = require("./getContact");
const cantactAdd = require("./contactAdd");
const deleteContact = require("./deleteContact");
const updateContactById = require("./updateContactById");

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContact: ctrlWrapper(getContact),
  contactAdd: ctrlWrapper(cantactAdd),
  deleteContact: ctrlWrapper(deleteContact),
  updateContactById: ctrlWrapper(updateContactById),
};
