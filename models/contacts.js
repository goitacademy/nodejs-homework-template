// const fs = require('fs/promises')
const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");
const id = shortid.generate();

const contactsPath = path.join(__dirname, "/contacts.json");

async function listContacts() {
  return JSON.parse(await fs.readFile(contactsPath, "utf-8"));
}

async function getById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();

  const deleteByIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (deleteByIndex === -1) {
    return null;
  }

  const deleteContact = contacts.splice(deleteByIndex, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, "\t"));

  return deleteContact;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();

  const newContact = { id, name, email, phone };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, "\t"));
  return newContact;
}

const updateContact = async (contactId, data) => {
  const contacts = await listContacts();
  const changeByIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (changeByIndex === -1) {
    return null;
  }

  contacts[changeByIndex] = { contactId, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, "\t"));
  return contacts[changeByIndex];
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
