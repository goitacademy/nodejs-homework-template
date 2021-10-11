// const fs = require('fs/promises')
// const contacts = require('./contacts.json')

const getAllContacts = require("./getAllContacts");

const getContactById = require("./getContactById");

const deleteContact = require("./deleteContact")

const addContact = require("./addContact")

const update = require("./update")

module.exports = {
  getAllContacts,
  getContactById,
  deleteContact,
  addContact,
  update,
}
