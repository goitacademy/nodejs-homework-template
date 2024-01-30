// const fs = require('fs/promises')

const fs = require('fs').promises;
const path = require('path');

const contactStorage = require('models/contacts.json')

const listContacts = async () => {
  return await contactStorage
}

const getContactById = async (contactId) => {

}

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
