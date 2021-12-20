
import fs from 'fs/promises'
import path, { dirname } from 'path'
import { randomUUID } from 'crypto'
import contacts from "./contacts.json"
import { fileURLToPath } from 'url'


const __dirname = path.dirname(fileURLToPath(import.meta.url))

const contactsPath = path.join(__dirname, 'contacts.json');


const listContacts = async () => {
  return contacts

}

const getContactById = async (contactId) => {
  const [result] = contacts.filter(contact => contact.id.toString() === contactId)
  console.log(result);
  return result
}

const removeContact = async (contactId) => {
  const index = contacts.findIndex(contact => contact.id.toString() === contactId)
  if (index !== -1) {
    const [result] = contacts.splice(index, 1)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return result
  }
  return null
}

const addContact = async ({ name, email, phone }) => {
  const newContact = { id: randomUUID(), name, email, phone, }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return newContact
}

const updateContact = async (contactId, body) => {
  const index = contacts.findIndex(contact => contact.id.toString() === contactId)
  if (index !== -1) {
    const patchedContact = { id: contactId, ...contacts[index], ...body }
    contacts[index] = patchedContact
    await fs.writeFile(path.join(__dirname, 'contacts.json'), JSON.stringify(contacts, null, 2))
    return patchedContact
  }
  return null
}


export default { listContacts, getContactById, removeContact, addContact, updateContact }
