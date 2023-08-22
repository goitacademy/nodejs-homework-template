const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "", "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const foundedContact = contacts.find((item) => item.id === contactId);
  return foundedContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const foundedIndex = contacts.findIndex((item) => item.id === contactId);
  contacts.splice(foundedIndex, 1);
  return await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const addContact = async (body) => {
  const contacts = await listContacts();
  contacts.push(body);
  return await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const foundedIndex = contacts.findIndex((item) => item.id === contactId);
  contacts[foundedIndex] = { ...body, id: contactId };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[foundedIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
