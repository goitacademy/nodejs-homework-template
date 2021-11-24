const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const contactsPath = path.resolve(`${__dirname}/contacts.json`);

async function listContacts() {
  const contactsFile = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(contactsFile);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const newContacts = contacts.filter((_, index) => index !== idx);
  await updateContact(newContacts);
  return contacts[idx];
}

async function addContact(data) {
  const contacts = await listContacts();
  const newContact = { id: uuidv4(), ...data };
  contacts.push(newContact);
  await updateContact(contacts);
  return newContact;
}

async function updateContact(body) {
  await fs.writeFile(contactsPath, JSON.stringify(body));
}

async function updateById(id, data) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => id === item.id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id, ...data };
  await updateContact(contacts);
  return contacts[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateById,
};
