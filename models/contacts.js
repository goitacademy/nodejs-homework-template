const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const { getListOfContacts, createNewContact } = require("../helpers");

const listContacts = async () => {
  const contacts = await getListOfContacts(contactsPath);
  return contacts;
};

const getById = async (contactId) => {
  const contacts = await getListOfContacts(contactsPath);
  const contact = contacts.find(({ id }) => id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await getListOfContacts(contactsPath);
  const filteredContacts = contacts.filter(({ id }) => id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
};

const addContact = async (body) => {
  const newContact = createNewContact(body);
  const contacts = await getListOfContacts(contactsPath);

  contacts.push(newContact);
  const updatedContacts = JSON.stringify(contacts, null, 2);
  await fs.writeFile(contactsPath, updatedContacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await getListOfContacts(contactsPath);
  const updatedIndex = contacts.findIndex(({ id }) => id === contactId);

  const updatedContact = { ...contacts[updatedIndex], ...body };
  contacts.splice(updatedIndex, 1, updatedContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return updatedContact;
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
