const fs = require('fs/promises');
const path = require('path');
const {randomUUID} = require('crypto');

const contactsPath = path.resolve(__dirname, "./contacts.json");

async function readDb() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function writeDb(db) {
  await fs.writeFile(contactsPath, JSON.stringify(db, null, 2));
}

async function listContacts() {
  const db = await readDb();
  return db;
}

async function getContactById(contactId) {
  const db = await readDb();
  const contact = db.find((contact) => contact.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const db = await readDb();
  const delContact = db.filter((contact) => contact.id !== contactId);
  await writeDb(delContact);
}

async function addContact(name, email, phone) {
  const id = randomUUID();
  const newContact = { id, name, email, phone };
  const db = await readDb();
  db.push(newContact);
  await writeDb(db);
  return newContact;
}

async function updateContact(contactId, body) {
  const db = await readDb();
  const contact = db.find((contact) => contact.id === contactId);
  if (!contact) {
    return null;
  }
  const updatedContact = { ...contact, ...body };
  const index = db.findIndex((el) => el.id === contactId);
  db.splice(index, 1, updatedContact);
  await writeDb(db);
  return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
