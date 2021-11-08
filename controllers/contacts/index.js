const getAll = require("./getAll");
const getById = require("./getContactById");
const add = require("./addContact");
const updateById = require("./updateContactById");
const deleteContactById = require("./deleteContactById");
const updateStatusContact = require("./updateStatusContact");
module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteContactById,
  updateStatusContact,
};
