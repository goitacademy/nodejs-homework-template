const fs = require('fs/promises');
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const allContacts = await fs.readFile(contactsPath);
  return JSON.parse(allContacts);
}

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const resultContact = allContacts.find(contact => contact.id === contactId);
  return resultContact || null;
}

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
      return null;
  };
  const [deleteContact] = allContacts.splice(index, 1);;
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return deleteContact || null;
}

const addContact = async (body) => {
  const allContacts = await listContacts();
  const newContact = { id: nanoid(), ...body }
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
}

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
      return null;
  };
  allContacts[index] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return allContacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
