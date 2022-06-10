const getContactsList = require("./getContactsList");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const updateById = require("./updateById");
const removeById = require("./removeById");
const updateStatus = require("./updateStatus");

module.exports = {
  getContactsList,
  getContactById,
  addContact,
  updateById,
  removeById,
  updateStatus,
};
