import fs from 'fs/promises'
import listContacts from './listContacts'
import getContactById from './getContactById'
import removeContact from './removeContact'
import addContact from './addContact'
import updateContact from './updateContact'
import { randomUUID } from 'crypto'
import contacts from '../contacts.json'

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
