const fs = require("fs/promises");
const { v4 } = require("uuid");
const updateContacts = require("./updateContacts");
const contactsPath = require("./contactsPath");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const searchedContact = contacts.find(
    (item) => item.id === contactId.toString()
  );
  if (!searchedContact) {
    return null;
  }
  return searchedContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId.toString());
  if (idx === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(idx, 1);

  await updateContacts(contacts);
  return removedContact;
};

const addContact = async ({ name, email, phone }) => {
  const newContact = { id: v4(), name, email, phone };
  const contacts = await listContacts();

  contacts.push(newContact);
  updateContacts(contacts);

  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const updatedContact = { id: contactId, name, email, phone };
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId.toString());
  if (idx === -1) {
    return null;
  }
  const [updatingContact] = contacts.splice(idx, 1, updatedContact);
  await updateContacts(contacts);

  return updatingContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
