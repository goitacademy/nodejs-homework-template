const getAllContacts = require("./getAllContacts");
const getByIdContact = require("./getByIdContact");
const addContact = require("./addContact");
const updateByIdContact = require("./updateByIdContact.js");
const updateStatusContact = require("./updateStatusContact");
const deleteByIdContact = require("./deleteByIdContact");

const { ctrlWrapper } = require("../../helpers");

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getByIdContact: ctrlWrapper(getByIdContact),
  addContact: ctrlWrapper(addContact),
  updateByIdContact: ctrlWrapper(updateByIdContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  deleteByIdContact: ctrlWrapper(deleteByIdContact),
};
