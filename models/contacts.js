const fs = require("fs/promises");
const path = require("path");
const { HttpError } = require("HttpError");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contactsList = await listContacts();
  const searchedContact = contactsList.find(
    (contact) => contact.id === contactId
  );
  if (!searchedContact) {
    throw new HttpError(404, "Not found");
  }
  return searchedContact || null;
};

const addContact = async (body) => {
  const contactsList = await listContacts();
  const newContact = { id: crypto.randomUUID(), ...body };
  contactsList.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contactsList = await listContacts();
  const editedContact = contactsList.find(
    (contact) => contact.id === contactId
  );
  if (!editedContact) {
    throw new HttpError(404, "Not found");
  }
  editedContact.name = body.name;
  editedContact.email = body.email;
  editedContact.phone = body.phone;
  fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return editedContact;
};

const removeContact = async (contactId) => {
  const contactsList = await listContacts();
  const index = contactsList.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    throw new HttpError(404, "Not found");
  }
  const [removedContact] = contactsList.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return removedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
