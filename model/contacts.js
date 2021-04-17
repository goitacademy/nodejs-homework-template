// const fs = require('fs/promises')
// const contacts = require('./contacts.json')
const bd = require ('./db')
const { v4: uuidv4 } = require('uuid');

const listContacts = async () => {}

const getContactById = async (contactId) => {}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
