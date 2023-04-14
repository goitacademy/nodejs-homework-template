const { getContacts } = require("./getContacts");
const { getContactById } = require("./getContactById");
const { postContact } = require("./postContact");
const { deleteContact } = require("./deleteContact");
const { changeContactbyId } = require("./changeContactbyId");
const { changeStatusContact } = require("./changeStatusContact");

module.exports = {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  changeContactbyId,
  changeStatusContact,
};
