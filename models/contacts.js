const fs = require('fs/promises')
const path = require("path")

const contactsPath = path.join(__dirname, "../models/contacts.json");

const listContacts = async () => {
  const result = await fs.readFile(contactsPath, "utf-8");

    return JSON.parse(result)
}

const getContactById = async (contactId) => {
  const contactsId = String(contactId)
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactsId);
    
    return result || null;
}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
