import fs from 'fs/promises'
import {nanoid} from 'nanoid'
import path from 'path'

const pathContacts = path.resolve("models", "contacts.json")

const updateContactList = (contact) => fs.writeFile(pathContacts, JSON.stringify(contact, null, 2))

export const listContacts = async () => {
  const data = await fs.readFile(pathContacts)
  return JSON.parse(data)
}

export const getContactById = async (contactId) => {
  const data = await listContacts()
  const results = data.find((element) => element.id === contactId)
 return results || null
}

export const removeContact = async (contactId) => {
  const data = await listContacts()
  const indexElement = data.findIndex((element) => element.id === contactId)
  if (indexElement === -1) {
    return null
  }
  const [results] = data.splice(indexElement, 1)
  await updateContactList(data)
  return results
}

export const addContact = async (body) => {
  const data = await listContacts()
  const newContacts = {
    ...body,
    id: nanoid()
  }
  data.push(newContacts)
  await updateContactList(data)
  return newContacts
}

export const updateContact = async (contactId, body) => {
  const data = await listContacts()
  const index = data.findIndex((element) => element.id === contactId)
  if (index === -1) {
    return null
  }
  data[index] = {...data[index], ...body}
  await updateContactList(data)
  return data[index]
}


