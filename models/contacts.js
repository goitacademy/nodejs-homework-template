const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.resolve("models", "contacts.json");

const listContacts = async () => {
  const contactList = await fs.readFile(contactsPath);
  return JSON.parse(contactList);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const oneContact = allContacts.find((contact) => contact.id === contactId);
  return oneContact || null;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const findContact = allContacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (findContact === -1) {
    return null;
  }
  const [result] = allContacts.splice(findContact, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return result;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const allContacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const findContact = allContacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (findContact === -1) {
    return null;
  }
  allContacts[findContact] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return allContacts[findContact];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
