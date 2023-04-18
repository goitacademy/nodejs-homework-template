// const {
//   getAllContacts,
//   getContactById,
//   addContact,
//   deleteContact,
//   updateContactById,
//   updateStatusContact,
// } = require("./contacts-controllers");

// module.exports = {
//   getAllContacts,
//   getContactById,
//   addContact,
//   deleteContact,
//   updateContactById,
//   updateStatusContact,
// };

const { ctrlWrapper } = require("../../utils");

const getAllContacts = require("./getAllContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const deleteContact = require("./deleteContact");
const updateContactById = require("./updateContactById");
const updateStatusContact = require("./updateStatusContact");

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContactById: ctrlWrapper(updateContactById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
