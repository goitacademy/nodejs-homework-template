const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

// console.log("contactsPath////", contactsPath);

async function listContacts() {
  const dbRaw = await fs.readFile(contactsPath);
  const contacts = JSON.parse(dbRaw);
  return contacts;
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const newContact = { id, name, email, phone };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const findContact = contacts.find((item) => item.id === contactId);
  if (!findContact) {
    return null;
  }
  const newContacts = contacts.filter((item) => item.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return findContact;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const findContact = contacts.find((item) => item.id === contactId);
  return findContact;
}

async function updateContactById(contactId, data) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { contactId, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[idx];
}

module.exports = {
  listContacts,
  addContact,
  removeContact,
  getContactById,
  updateContactById,
};
