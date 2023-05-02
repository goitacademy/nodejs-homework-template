const fs = require("fs").promises
const path = require("path")
const { nanoid } = require("nanoid")
const contactsPath = path.join(__dirname, "contacts.json")

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data)
}

const getContactById = async (id) => {
  const contacts = await listContacts()
  const result = contacts.find((i) => i.id === id)
  return result || null
}

const addContact = async (data) => {
  const contacts = await listContacts()
  const newContact = {
    id: nanoid(),
    ...data,
  }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return newContact
}

const removeContact = async (id) => {
  const contacts = await listContacts()
  const index = contacts.findIndex((i) => i.id === id)
  if (index === -1) {
    return null
  }
  const [result] = contacts.splice(index, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return result
}

const updateContact = async (contactId, body) => {
  const {name,email,phone}=body;
  const contacts = await listContacts()
  const index = contacts.findIndex((i) => i.id === contactId)
  if (index === -1) {
    return null
  }
  if (name) contacts[index].name=name;
  if (email) contacts[index].email=email;
  if (phone) contacts[index].phone=phone;
  const result = contacts[index];
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
