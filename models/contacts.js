const fs = require('fs/promises')
const path = require("path")
const { nanoid } = require("nanoid");


const contactsPath = path.join(`${__dirname}/contacts.json`)

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8")
  return JSON.parse(data)
}

const getContactById = async (id) => {
  const contacts = await listContacts()
  const data = contacts.find(item => item.id === id)
   console.log(data)
  return data || null
}

const removeContact = async (id) => {
  const contacts = await listContacts()
  const index = contacts.findIndex(item => item.id === id)
  if (index === -1) { 
      return null
  }
  const [result] = contacts.splice(index, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return result
}

const addContact = async (body) => {
  const contacts = await listContacts()
    const newContact = {
        id: nanoid(),
        ...body
    }
    contacts.push(newContact)

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return newContact || null
}

const updateContact = async (id, body) => {
  console.log(id)
  const contacts = await listContacts()
  const index = contacts.findIndex(item => item.id === id)
  if (index === -1) { 
      return null
  }
  contacts[index] = {id, ...body}
  
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  
  return contacts[index]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
