// const fs = require('fs/promises')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8')
  const contacts = JSON.parse(data)
  return contacts
}

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
