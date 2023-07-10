const {
  getAllContacts,
  getContactsById,
  addContact,
  removeContactById,
  updateContactById,
  updateFavoriteContact,
} = require("./contacts");
const {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  updateUserSubscription,
} = require("./auth");

module.exports = {
  contactsCtrl: {
    getAllContacts,
    getContactsById,
    addContact,
    removeContactById,
    updateContactById,
    updateFavoriteContact,
  },
  authCtrl: {
    registerUser,
    loginUser,
    getCurrentUser,
    logoutUser,
    updateUserSubscription,
  },
};
