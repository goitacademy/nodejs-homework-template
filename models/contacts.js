import fs from 'fs/promises'
import path from 'path'
import { nanoid } from 'nanoid'

const contactsPaths = path.resolve('models', 'contacts.json')

async function listContacts() {
    const result = await fs.readFile(contactsPaths)
    return JSON.parse(result)
}

async function getContactById(contactId) {
    const contacts = await listContacts()
    const result = contacts.find(obj => obj.id === contactId)
    return result || null
}

async function removeContact(contactId) {
    const contacts = await listContacts()
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPaths, JSON.stringify(contacts, null, 2))
    return result;
}

async function addContact({ name, email, phone }) {
    const contacts = await listContacts()
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    }
    contacts.push(newContact) 
    await fs.writeFile(contactsPaths, JSON.stringify(contacts, null, 2))
    return newContact
}

async function updateContact(contactId, body) {
  const contacts = await listContacts()
    const index = contacts.findIndex(item => item.id === contactId)
    if (index === -1) {
        return null
    }
    contacts[index] = { ...contacts[index], ...body }
    await fs.writeFile(contactsPaths, JSON.stringify(contacts, null, 2))
    return contacts[index]
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
