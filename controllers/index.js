const { ctrlWrapper } = require("../helpers");

const getAllListContacts = require("./getAllListContacts");
const getById = require("./getById");
const addContact = require("./addContact");
const deleteById = require("./deleteById");
const updateById = require("./updateById");
const updateStatusContact = require("./updateStatusContact");

module.exports = {
  getAllListContacts: ctrlWrapper(getAllListContacts),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};