const getAll = require('./getAllContacts')
const getById = require('./getContactById')
const remove = require('./removeContact')
const add = require('./addContact')
const update = require('./updateContact')

module.exports = {
  getAll,
  getById,
  remove,
  add,
  update,
}
