const ctrlWrapper = require("../../helpers/ctrlWrapper");
const addContact = require("./addContact");
const deleteContact = require("./deleteContact");
const editContact = require("./editContact");
const getAll = require("./getAll");
const getById = require("./getById");
const updateStatusContact = require("./updateStatusContact");

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  editContact: ctrlWrapper(editContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
