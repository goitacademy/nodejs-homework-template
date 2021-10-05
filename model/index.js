const listContactsModel = require('./contacts/listContactsModel')
const getContactByIdModel = require('./contacts/getContactByIdModel')
const removeContactModel = require('./contacts/removeContactModel')
const addContactModel = require('./contacts/addContactModel')
const changeContactModel = require('./contacts/changeContactModel')
const updateStatusContactModel = require('./contacts/updateStatusContactModel')

module.exports = {
  listContactsModel,
  getContactByIdModel,
  removeContactModel,
  addContactModel,
  changeContactModel,
  updateStatusContactModel
}
