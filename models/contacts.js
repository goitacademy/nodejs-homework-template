const fs = require('fs/promises')
const { v4: uuidv4 } = require('uuid')
const contactsPath = './models/contacts.json'
const handleError = require('../helpers/handleError')


const listContacts = async () => {
  return await handleError(async () => {
    const data = await fs.readFile(contactsPath)
    return JSON.parse(data)
  })
}

const getContactById = async (contactId) => {
  return handleError(async () => {
    const contacts = await listContacts()
    const contact = contacts.find(({ id }) => id.toString() === contactId)
    return contact
  })
}

const removeContact = async (contactId) => {
  return handleError(async () => {
    const contacts = await listContacts()
    const indexToRemove = contacts.findIndex((contact) => contact.id.toString() === contactId)

    if (indexToRemove !== -1) {
      contacts.splice(indexToRemove, 1)
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
      return true
    } else {
      return false
    }
  })
}

const addContact = async (body) => {
  return handleError(async () => {
    const contacts = await listContacts()

    const newContact = {
      id: uuidv4(),
      ...body
    }

    contacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts))

    return newContact
  })
}

const updateContact = async (contactId, body) => {
  return await handleError(async () => {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex((contact) => contact.id === contactId);

    if (contactIndex === -1) {
      return null;
    }

    contacts[contactIndex] = { ...contacts[contactIndex], ...body };

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[contactIndex];
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
