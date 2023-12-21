import fs from 'fs/promises'
import { nanoid } from 'nanoid'
import path from 'path'

type Contact = {
  id: string
}

type Data = {
  name: string
  phone: string
  email: string
}

type PartialData = Partial<Data>

const contactsPath = path.resolve('models', 'contacts', 'contacts.json')
const updateContacts = (contacts: Data) => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))

export const listContacts = async () => JSON.parse(await fs.readFile(contactsPath, 'utf-8'))

export const getContactById = async (id: string) => {
  const contacts = await listContacts()
  return contacts.find((contact: Contact) => contact.id === id) || null
}

export const removeContact = async (id: string) => {
  const contacts = await listContacts()
  const i = contacts.findIndex((contact: Contact) => contact.id === id)
  if (i === -1) {
    return null
  }
  const [result] = contacts.splice(i, 1)
  await updateContacts(contacts)
  return result
}

export const updateContact = async (id: string, data: PartialData) => {
  const contacts = await listContacts()
  const i = contacts.findIndex((contact: Contact) => contact.id === id)
  if (i === -1) {
    return null
  }
  contacts[i] = { ...contacts[i], ...data }
  await updateContacts(contacts)
  return contacts[i]
}

export const addContact = async (data: Data) => {
  const contacts = await listContacts()
  const newContact = { id: nanoid(), ...data }
  contacts.push(newContact)
  await updateContacts(contacts)
  return newContact
}
