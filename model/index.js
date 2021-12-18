import fs from 'fs/promises'
import path, { dirname } from 'path'
import {randomUUID} from 'crypto'
import contacts from './contacts.json'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const contactsPath = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
     return contacts
   }

const getContactById = async (contactId) => {
   const foundContact = contacts.find(el => el.id === contactId)
   return foundContact
   }

const removeContact = async (contactId) => {
   const removedContact = contacts.find(contact => contact.id === contactId)
   contacts.forEach((el,i) => {if (el.id == contactId) contacts.splice(i, 1)
   })
   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
   return removedContact
 }

const addContact = async ({name, email, phone}) => {
     const newContact = { id: randomUUID(), name, email, phone}
     contacts.push(newContact)
     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
     return newContact
   }

const updateContact = async (contactId, body) => {
    const index = contacts.findIndex(contact => contact.id === contactId)
    if (index !== -1) {
      const updatedContact = {id: contactId, ...contacts[index], ...body}
      contacts[index] = updatedContact
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return updatedContact
    }
    return null
  }

export default {listContacts, getContactById, removeContact, addContact, updateContact}
