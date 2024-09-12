const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.resolve("./models/contacts.json");
const { nanoid } = require("nanoid");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getById = async (contactId) => {
  const contacts = await listContacts();
  const idToString = String(contactId);
  const findContact = contacts.find((item) => item.id === idToString);
  return findContact || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idToString = String(contactId);
  const index = contacts.findIndex((item) => item.id === idToString);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContactList(contacts);
  return result;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContact);
  await updateContactList(contacts);
  return newContact;
};
const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { contactId, ...body };
  await updateContact(contacts);
  return contacts[index];
};

const updateContactList = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
  updateContactList,
};
