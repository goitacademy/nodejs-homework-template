const {
  getAllContacts,
  getContactsById,
  addContact,
  removeContactById,
  updateContactById,
  updateFavoriteContact,
} = require("./contacts");

module.exports = {
  contactsCtrl: {
    getAllContacts,
    getContactsById,
    addContact,
    removeContactById,
    updateContactById,
    updateFavoriteContact,
  },
};
