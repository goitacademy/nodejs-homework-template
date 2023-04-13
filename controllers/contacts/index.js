const getContacts = require("./getContacts");
const getContactById = require("./getContactById");
const postContact = require("./postContact");
const deleteContact = require("./deleteContact");
const changeContact = require("./changeContact");
const updateStatusContact = require("./updateStatusContact");

module.exports = {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  changeContact,
  updateStatusContact,
};
