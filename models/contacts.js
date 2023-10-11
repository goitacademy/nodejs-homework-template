const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const pathToContacts = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(pathToContacts, "utf-8");
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const indexOfContact = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (indexOfContact === -1) return null;
  const [result] = contacts.splice(indexOfContact, 1);
  await fs.writeFile(pathToContacts, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContact);
  await fs.writeFile(pathToContacts, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const indexOfContact = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (indexOfContact === -1) return null;
  contacts[indexOfContact] = {
    ...contacts[indexOfContact],
    ...body,
  };
  await fs.writeFile(pathToContacts, JSON.stringify(contacts, null, 2));
  return contacts[indexOfContact];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
