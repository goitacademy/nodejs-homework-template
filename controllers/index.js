const {
  changeContactbyId,
  changeStatusContact,
  deleteContact,
  getContacts,
  getContactById,
  postContact,
} = require("./contactsControllers");

module.exports = {
  getContacts,
  getContactById,
  postContact,
  changeContactbyId,
  changeStatusContact,
  deleteContact,
};
