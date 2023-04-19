const {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  changeContactbyId,
  changeStatusContact,
} = require("./contacts");

const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
} = require("./auth");

module.exports = {
  getContacts,
  getContactById,
  postContact,
  changeContactbyId,
  changeStatusContact,
  deleteContact,
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
};
