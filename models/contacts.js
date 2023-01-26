const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve(__dirname, "./contacts.json");

const listContacts = async () => {
  contactsRaw = await fs.readFile(contactsPath);
  contacts = JSON.parse(contactsRaw);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const getContacts = contacts.find((contact) => contact.id === contactId);
  if (!getContacts) {
    return null;
  }
  return getContacts;
};

const removeContact = async (contactId) => {
  const id = contactId;
  const contacts = await listContacts();
  const updatedContacts = contacts.filter((contact) => contact.id !== id);
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
};

const addContact = async (body) => {
  const contacts = await listContacts();
  contacts.push(body);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return body;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const updatedContacts = contacts.find((contact) => contact.id === contactId);

  updatedContacts.push(body);

  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  return body;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
