const { ctrlWrapper } = require("../../helpers");
const getAllContacts = require("./getAllContacts");
const getContactById = require("./getContactById");
const postContact = require("./postContact");
const deleteContactById = require("./deleteContactById");
const updateContactById = require("./updateContactById");
const updateFavoriteContactById = require("./updateFavoriteContactById");

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  postContact: ctrlWrapper(postContact),
  deleteContactById: ctrlWrapper(deleteContactById),
  updateContactById: ctrlWrapper(updateContactById),
  updateFavoriteContactById: ctrlWrapper(updateFavoriteContactById),
};
