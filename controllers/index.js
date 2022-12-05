const getAll = require("./getAllContacts")
const getById = require("./getContactById")
const add = require("./addContact")
const updateById = require("./updateByContactId")
const remove = require("./removeContact")

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  remove
}