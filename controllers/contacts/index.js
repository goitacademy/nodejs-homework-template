const getContacts = require("./getContacts");
const getContactById = require("./getContactById");
const removeById = require("./removeById");
const add = require("./add");
const updateById = require("./updateById");
const updateStatusContact  = require("./updateStatusContact");

module.exports = {
  getContacts,
  getContactById,
  removeById,
  add,
  updateById,
  updateStatusContact ,
};
