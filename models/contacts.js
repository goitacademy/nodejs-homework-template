const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const foundContact = contacts.find((contact) => contact.id === contactId);

  if (!foundContact) {
    return null;
  }

  return foundContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactToRemove = contacts.find((contact) => contact.id === contactId);

  if (!contactToRemove) {
    return null;
  }

  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  return contactToRemove;
};

const addContact = async (body) => {
  const contacts = await listContacts();

  const existingContact = contacts.find(
    (contact) => contact.name === body.name
  );
  if (existingContact) {
    throw new Error("Contact with this name already exists.");
  }

  const newContact = { id: nanoid(), ...body };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (contactIndex === -1) {
    return null;
  }

  contacts[contactIndex] = { ...contacts[contactIndex], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
