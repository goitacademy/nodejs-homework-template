const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

async function getContactById(id) {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === id);
  if (!contact) {
    return null;
  }
  return contact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: v4(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

async function updateById(id) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id, ...contacts };
  await updateContacts(contacts);
  return contacts[idx];
}

async function removeContact(id) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === id);
  if (idx === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(idx, 1);
  fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
};
