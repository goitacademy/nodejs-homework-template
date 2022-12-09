
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

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId.toString())
  if (index === -1) {
    return null
  }
  const [result] = contacts.splice(index,1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return result
}

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

const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);
  console.log(contactId)
  if (index === -1) {
    return null;
  }
  data[index] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2))
  return data[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
