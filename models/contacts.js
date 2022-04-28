// const fs = require('fs/promises')

const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const result = data.find(({ id }) => id === contactId);

  return result;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const removedEl = [];
  const newContacts = contacts.reduce((acc, el) => {
    if (el.id === String(contactId)) {
      removedEl.push(el);
      return acc;
    }
    acc.push(el);
    return acc;
  }, []);

  if (removedEl.length < 1) {
    return null;
  }
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));

  return removedEl;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();

  const newContact = { name, email, phone, id: v4() };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
};

const updateContact = async (id, { name, email, phone }) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
