const ctrlWrapper = require("../helpers/ctrlWrapper");
const getAllContacts = require("./getAllContacts");
const getById = require("./getById");
const addContact = require("./addContact");
const updateById = require("./updateById");
const deleteById = require("./deleteById");

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};