const fs = require("fs/promises");
const path = require("path");

const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const readSesult = await fs.readFile(contactsPath);
  const usersList = JSON.parse(readSesult);

  return usersList;
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const result = allContacts.find((user) => user.id === contactId);

  return result || null;
};

const createContact = async (data) => {
  const contacts = await listContacts();

  const newContact = {
    id: uuidv4(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
};

const removeContact = async (id) => {
  const allContacts = await listContacts();
  const user = allContacts.findIndex((user) => user.id === id);
  const result = allContacts.splice(user, 1);

  if (user === -1) return null;
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return result;
};

const updateContact = async (id, data) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === id);

  if (index === -1) return null;

  allContacts[index] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return allContacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  createContact,
  updateContact,
};
