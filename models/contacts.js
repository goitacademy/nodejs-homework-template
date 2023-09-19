const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const fileBuffer = await fs.readFile(contactsPath);
  return JSON.parse(fileBuffer);
}

async function getContactById(contactId) {
  const db = await listContacts();
  return db.find((contact) => contact.id === contactId) || null;
}

async function removeContact(contactId) {
  const db = await listContacts();
  const index = db.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  const [removedContact] = db.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(db, null, 2));
  return removedContact;
}

async function addContact({ name, email, phone }) {
  const db = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  db.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(db, null, 2));
  return newContact;
}

async function updateContactById(contactId, data) {
  const db = await listContacts();
  const index = db.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  db[index] = { id: contactId, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(db, null, 2));
  return db[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
