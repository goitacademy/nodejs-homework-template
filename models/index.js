const fs = require("fs/promises");
const path = require("path");
const crypto = require("node:crypto");

const FILE_PATH = path.resolve(__dirname, "contacts.json");

const updatedContactsList = (allContacts) =>
  fs.writeFile(FILE_PATH, JSON.stringify(allContacts, null, 2));

const listContacts = async () => {
  const contacts = JSON.parse(await fs.readFile(FILE_PATH));
  return contacts;
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();

  const contact = allContacts.find((item) => item.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();

  const indexToRemove = allContacts.findIndex((item) => item.id === contactId);

  if (indexToRemove === -1) {
    return null;
  }
  const removedContact = allContacts.splice(indexToRemove, 1)[0];
  await updatedContactsList(allContacts);
  return removedContact;
};

const addContact = async ({ name, email, phone }) => {
  const allContacts = await listContacts();
  const newContact = { id: crypto.randomUUID(), name, email };

  const existingContact = allContacts.find(
    (contact) => contact.name === name && contact.email === email
  );

  if (existingContact) {
    console.log("Contact already exists.");
    return null;
  }

  allContacts.push(newContact);
  await updatedContactsList(allContacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const indexToUpdate = allContacts.findIndex((item) => item.id === contactId);
  if (indexToUpdate === -1) {
    return null; // Contact not found
  }

  const updatedContact = { ...allContacts[indexToUpdate], ...body };
  allContacts[indexToUpdate] = updatedContact;

  await updateContactsList(allContacts);
  return updatedContact;
};
const updateContactsList = (allContacts) =>
  fs.writeFile(FILE_PATH, JSON.stringify(allContacts, null, 2));

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
