const { readFile, writeFile } = require("fs/promises");
const path = require("path");
// const { nanoid } = require("nanoid");
const { v4: uuidv4 } = require("uuid");

const pathToContacts = path.join("models", "contacts.json");

const listContacts = async () => {
  const readContacts = await readFile(pathToContacts);
  return JSON.parse(readContacts);
};

const getContactById = async (contactId) => {
  const findContact = await listContacts();
  return findContact.find(({ id }) => id === contactId);
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = allContacts.splice(index, 1);
  await writeFile(pathToContacts, JSON.stringify(allContacts, null, 2));
  return result;
};

const addContact = async (name, email, phone) => {
  const allContacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  await writeFile(pathToContacts, JSON.stringify(allContacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  allContacts[index] = { id: contactId, ...body };
  await writeFile(pathToContacts, JSON.stringify(allContacts, null, 2));
  return allContacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
