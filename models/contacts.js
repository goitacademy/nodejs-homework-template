const fs = require('fs/promises');
const path = require("path");
const { v4 } = require("uuid");

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

const removeContact = async (contactId) => {
  const contactsId = String(contactId)
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactsId);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result
 }




const addContact = async (body) => {
  const contacts = await listContacts();
    const newContact = {id: v4(), ...body}
    contacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact;
}




const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
