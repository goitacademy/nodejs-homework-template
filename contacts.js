const path = require("path");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("db/contacts.json");

function storeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function listContacts() {
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);

  return contact ?? null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index < 0) {
    return null;
  }
  const [deletedContact] = contacts.splice(index, 1);

  await storeContacts(contacts);
  return deletedContact;
}

async function addContact(name, email = "", phone = "") {
  if (!name) {
    throw new Error("Name is required.");
  }

  if (!email && !phone) {
    throw new Error("Enter at least an email or a phone number");
  }

  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);

  await storeContacts(contacts);

  return newContact;
}

async function updateContact(contactId, name, email = "", phone = "") {
  if (!name) {
    throw new Error("Name is required.");
  }

  if (!email && !phone) {
    throw new Error("Enter at least an email or a phone number");
  }

  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index < 0) {
    return null;
  }
  const updatedContact = { id: contactId, name, email, phone };
  contacts[index] = updatedContact;

  await storeContacts(contacts);

  return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
