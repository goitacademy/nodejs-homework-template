// const fs = require('fs/promises')

// const listContacts = async () => {}

// const getContactById = async (contactId) => {}

// const removeContact = async (contactId) => {}

// const addContact = async (body) => {}

const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContact = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  if (!result) {
    return null;
  }
  return result;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContact(contacts);
  return newContact;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const deleteIndx = contacts.findIndex((item) => item.id === id);
  if (deleteIndx === -1) {
    return null;
  }
  const [result] = contacts.splice(deleteIndx, 1);
  await updateContact(contacts);
  return result;
};

const updateContactById = async (id, { name, email, phone }) => {
  const contacts = await listContacts();
  const updateIndx = contacts.findIndex((item) => item.id === id);
  if (updateIndx === -1) {
    return null;
  }
  contacts[updateIndx] = { id, name, email, phone };
  await updateContact(contacts);
  return contacts[updateIndx];
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
