import fs from 'fs/promises'
import { nanoid } from 'nanoid'
import path from 'path'

const contactsPath = path.resolve('models', 'contacts.json')

export const getContacts = async () => JSON.parse(await fs.readFile(contactsPath))

export const getContactById = async (id) => {
  const contacts = await getContacts()
  return contacts.find((contact) => contact.id === id) || null
}

export const deleteContact = async (id) => {
  const contacts = await getContacts()
  const i = contacts.findIndex((contact) => contact.id === id)
  if (i === -1) return null
  const [result] = contacts.splice(i, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return result
}

export const addContact = async (data) => {
  const contacts = await getContacts()
  const newContact = { id: nanoid(), ...data }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return newContact
}

export const updateContactById = async (id, data) => {
  const contacts = await getContacts()
  const i = contacts.findIndex((contact) => contact.id === id)
  if (i === -1) return null
  contacts[i] = { ...contacts[i], ...data }
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return contacts[i]
}
