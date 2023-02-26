const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contactsList = JSON.parse(data);
  return contactsList;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find((c) => c.id === contactId.toString());
  if (!contactById) {
    return null;
  }
  return contactById;
}

async function updateContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactToRemove = contacts.findIndex(
    (c) => c.id === contactId.toString()
  );
  if (contactToRemove === -1) {
    return null;
  }
  const newContacts = contacts.filter((_, index) => index !== contactToRemove);
  await updateContacts(newContacts);
  return contacts[contactToRemove];
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

async function updateContact(contactId, body) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const contact = contacts.find((contact) => contact.id === contactId);
  const updatedContact = { ...contact, ...body };

  contacts.splice(idx, 1, updatedContact);
  await updateContacts(contacts);
  return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
