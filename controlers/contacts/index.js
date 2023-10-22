const { ctrlWrapper } = require("../../utils");
const createContact = require("./createContact");
const deleteContact = require("./deleteContact");
const getAllContacts = require("./getAllContacts");
const getContactById = require("./getContactById");
const updateContact = require("./updateContact");
const updateFavorite = require("./updateFavorite");

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteContact: ctrlWrapper(deleteContact),
};
