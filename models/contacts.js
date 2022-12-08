// const fs = require('fs/promises')
const path = require("path");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const contactsPath = path.resolve("models/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf8")
  return JSON.parse(data)
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result
}

const removeContact = async (contactId) => {}

const addContact = async ({name, email, phone}) => {
  const contacts = await listContacts();
    const newContact = {
      id:nanoid(),
      name,
      email,
      phone,
    }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return newContact
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
