const { getContacts } = require("./getContacts");
const deleteContact = require("./deleteContact");
const getById = require("./getById");
const postContact = require("./postContact");
const updateContact = require("./updateContact");
const updateStatus = require("./updateStatus");

module.exports = {
  getContacts,
  deleteContact,
  getById,
  postContact,
  updateContact,
  updateStatus,
};
