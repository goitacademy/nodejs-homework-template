const getListContacts = require("./getListContacts");
const getContactById = require("./getContactById");
const postAddContact = require("./postAddContact");
const putUpdateById = require("./putUpdateById");
const deleteContactById = require("./deleteContactById");
const updateStatusContact = require("./updateStatusContact");

module.exports = {
  getListContacts,
  getContactById,
  postAddContact,
  putUpdateById,
  deleteContactById,
  updateStatusContact,
};
