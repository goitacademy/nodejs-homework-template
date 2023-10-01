const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("models", "contacts.json");
const updateContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const getAllContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const allContacts = await getAllContacts();
  const result = allContacts.find(item => item.contactId === contactId);
  return result || null;
}

const removeContact = async (contactId) => {
  const allContacts = await getAllContacts();
  const index = allContacts.findIndex(item => item.contactId === contactId);
  if (index === -1) {
    return null
  }
  const [result] = allContacts.splice(index, 1);
  await updateContacts(allContacts);
  return result;
}

const addContact = async (body) => {
  const allContacts = await getAllContacts();
  const newContact = { id: uuidv4(), ...body };
  allContacts.push(newContact);
  await updateContacts(allContacts);
  return newContact;
}

const updateContact = async (contactId, body) => {
  const allContacts = await getAllContacts();
  const index = allContacts.findIndex(item => item.contactId === contactId);
  if (index === -1) {
    return null
  }
  allContacts[index] = { id: contactId, ...body };
  await updateContacts(allContacts);
  return allContacts[index];
}

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}