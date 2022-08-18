const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = await findIndexOfContactById(contacts, contactId);
  if (index === -1) {
    return null;
  }
  const removedContact = contacts.splice(index, 1);
  updateContacts(contacts);
  return removedContact;
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), ...data };
  contacts.push(newContact);
  updateContacts(contacts);
  return newContact;
};

const updateContact = async (id, data) => {
  const contacts = await listContacts();
  const index = await findIndexOfContactById(contacts, id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...data };
  updateContacts(contacts);
  return contacts[index];
};

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

const findIndexOfContactById = async (contacts, id) => {
  const indexOfContact = await contacts.findIndex((item) => item.id === id);
  return indexOfContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
