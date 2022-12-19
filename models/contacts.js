const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "./contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);

  return contacts;
}

async function getContactById(id) {
  const contact = await listContacts();
  const result = contact.find((item) => item.id === id);
  if (!result) {
    return null;
  }

  return result;
}

async function removeContact(id) {
  const contact = await listContacts();
  const idx = contact.findIndex((item) => item.id === id);

  if (idx === -1) {
    return null;
  }

  const [result] = contact.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
  return result;
}

async function addContact({ name, email, phone }) {
  const contact = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contact.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contact));
  return newContact;
}

async function updateContact(id, { name, email, phone }) {
  const contact = await listContacts();
  const idx = contact.findIndex((item) => item.id === id);

  if (idx === -1) {
    return null;
  }

  contact[idx] = { id, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contact));
  return contact[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
