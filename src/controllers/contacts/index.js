const getAllContacts = require("./getAllContacts");
const getContactById = require("./getContactById");
const addNewContact = require("./addNewContact");
const removeContactById = require("./removeContactById");
const changeContactById = require("./changeContactById");
const updateStatusById = require("./updateStatusById");

module.exports = {
  getAllContacts,
  getContactById,
  addNewContact,
  removeContactById,
  changeContactById,
  updateStatusById,
};
