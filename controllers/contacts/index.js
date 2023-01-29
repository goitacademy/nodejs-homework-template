const getContactsList = require("./getContactsList");
const getContactById = require("./getContactById");
const createContact = require("./createContact");
const updateById = require("./updateContactById");
const removeContactById = require("./removeContactById");

module.exports = {
  getContactsList,
  getContactById,
  createContact,
  updateById,
  removeContactById,
};
