const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const HttpError = require("../utils/HttpError");

const contactPath = path.join(__dirname, "..", "models", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);

  if (!contact) {
    throw new HttpError(404, "This contact does not exist!");
  }

  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (contactIndex === -1) {
    throw new HttpError(404, "This contact does not exist!");
  }

  contacts.splice(contactIndex, 1);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 4));
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: crypto.randomUUID(), ...body };

  contacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 4));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (contactIndex === -1) {
    throw new HttpError(404, "This contact does not exist!");
  }

  contacts[contactIndex] = { ...contacts[contactIndex], ...body };

  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 4));
  return contacts[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
