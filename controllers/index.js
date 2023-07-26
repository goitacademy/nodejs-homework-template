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
  updateAvatar,
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
    updateAvatar,
  },
};
