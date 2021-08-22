const fs = require('fs/promises')
const path = require('path')
const { v4 } = require('uuid')
// const contacts = require('./contacts.json')

const contactsPath = path.join(__dirname, 'contacts.json')

const updateContactsList = async (contacts) => {
  const contactsString = JSON.stringify(contacts)
  await fs.writeFile(contactsPath, contactsString)
}

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)
    return contacts
  } catch (error) {
    throw error
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts()
    const findContact = contacts.find(contact => contact.id.toString() === contactId)
    if (!findContact) {
      return null
    };
    return findContact
  } catch (error) {
    throw error
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts()
    const index = contacts.findIndex(contact => contact.id.toString() === contactId)
    if (index === -1) {
      return null
    };

    const newContactsList = contacts.filter(contact => contact.id.toString() !== contactId)
    updateContactsList(newContactsList)

    return contacts[index]
  } catch (error) {
    throw error
  }
}

const addContact = async (body) => {
  try {
    const contacts = await listContacts()
    const newContact = { ...body, id: v4() }
    const newContactsList = [...contacts, newContact]
    updateContactsList(newContactsList)

    return newContact
  } catch (error) {
    throw error
  }
}

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);

    if (index === -1) {
      return null;
    };

    contacts[index] = { ...contacts[index], ...body };
    updateContactsList(contacts);

    return contacts[index];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
