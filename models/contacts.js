const fs = require('fs/promises')
const path = require("path");
const {nanoid} = require("nanoid")

const contactsPath = path.join(__dirname, "contacts.json")

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const contact = await listContacts();
  const result = contact.find(i => i.id === contactId);
  return result || null;
}

const removeContact = async (contactId) => {
  const contact = await listContacts();
    const index = contact.findIndex(i => i.id === contactId);
    if (index === -1) {
      return null
    }
    const [result] = contact.splice(index, 1)
    await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2))
    return result;
}

const addContact = async (body) => {
  const contact = await listContacts();
    const contactNew = {
      id: nanoid(),
      ...body,
    }
    contact.unshift(contactNew);
    await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2))
    return contactNew;
}

const updateContact = async (id, body) => {
    const contact = await listContacts();
    const index = contact.findIndex(i => i.id === id);
    if (index === -1) {
      return null
    }
    contact[index] = {id, ...body}
    await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2))
    return contact[index];
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
