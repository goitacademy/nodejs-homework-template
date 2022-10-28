const fs = require('fs/promises')
const path = require('path')
const { v4: uuidv4 } = require('uuid');


const contactsPath = path.join(__dirname, 'contacts.json');

const update = async (contacts) => { await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2)) }

const listContacts = async () => { return JSON.parse(await fs.readFile(contactsPath)) }

const getContactById = async (contactId) => {
    const contacts = await listContacts()
    const contact = contacts.find((contact) => contact.id === contactId)
    return contact
}

const removeContact = async (contactId) => {
    const contacts = await listContacts()
    const idx = contacts.findIndex((contact) => contact.id === contactId)
    if (idx === -1) {
        return null
    }
    const [contact] = contacts.splice(idx, 1)
    await update(contacts)
    return contact
}

const addContact = async ({name, email, phone}) => {
    const contacts = await listContacts()
    const newContact = { id: uuidv4(), name, email, phone }
    contacts.push(newContact)
    await update(contacts)
    return newContact
}

const updateContact = async (contactId, body) => {
    const contacts = await listContacts()
    const idx = contacts.findIndex((contact) => contact.id === contactId)
    if (idx === -1) {
        return null
    }
    contacts[idx] = { ...contacts[idx], ...body }
    await update(contacts)
    return contacts[idx]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
