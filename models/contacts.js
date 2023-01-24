const fs = require('fs/promises');
const path = require("path");
const { nanoid } = require("nanoid");

const dbPath = path.resolve(__dirname, './contacts.json');

async function readDb() {
  const dbRaw = await fs.readFile(dbPath);
  const db = JSON.parse(dbRaw);
  return db;
}

async function writeDb(db) {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
}


async function listContacts({ limit = 10}) {
  const db = await readDb();
  return db.slice(-limit);
}

async function getContactById(id) {
  const db = await readDb();
  const contact = db.find((contact) => contact.id === id);
  return contact || null;
}


async function removeContact(contactId) {
  const db = await readDb();
  const updateDb = db.filter((contact) =>
    contact.id !== contactId);
  await writeDb(updateDb);
}


async function addContact(name, email, phone) {
  const id = nanoid();
  const contact = { id, name, email, phone };
  const db = await readDb();
  db.push(contact);
  await writeDb(db);
  return contact;
}

async function updateContact(id, body) {
  const db = await readDb();
  const contactId = db.findIndex((contact) => contact.id === id);
  if (!contactId) {
    return null;
  }
 
  db[contactId] = { id, ...body };
  await writeDb(db);
  return db;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
