const fs = require("fs/promises");
const path = require("path");
const { v4: uuid } = require("uuid");
const createError = require("http-errors");

const contactsPath = path.join(__dirname, "./contacts.json");

async function updateFile(contacts = []) {
  const contact = fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contact;
}

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);

  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);

  return contact;
}

async function addContact(contact) {
  const contacts = await listContacts();
  const newContact = { ...contact, id: uuid() };
  contacts.push(newContact);
  updateFile(contacts);
  return newContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(({ id }) => id === contactId);
  if (contactIndex === -1) {
    throw createError(
      404,
      `Contact with contactId - ${contactId} is not found`
    );
  }
  const deleteContact = contacts.splice(contactIndex, 1);
  await updateFile(contacts);
  return deleteContact;
}

async function updateContact(contactId, body) {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(({ id }) => id === contactId);
  if (contactIndex === -1) {
    throw createError(404, "Contact is not found");
  }
  contacts[contactIndex] = { id: contactId, ...body };
  await updateFile(contacts);
  return contacts[contactIndex];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateFile,
  updateContact,
};
