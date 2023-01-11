const path = require('path');
const fs = require('fs/promises');
const { nanoid } = require('nanoid');

const contactsPath = path.resolve(__dirname, './contacts.json');

async function readDb() {
  const dbRaw = await fs.readFile(contactsPath);
  const db = JSON.parse(dbRaw);
  return db;
};

async function writeDb(db) {
  await fs.writeFile(contactsPath, JSON.stringify(db, null, 2));
};

const listContacts = async () => {
  const db = await readDb();
  return db;
};

const getContactById = async contactId => {
  const db = await readDb();
  const contact = db.find((c) => c.id === contactId);
  return contact || null;
};

const removeContact = async contactId => {
  const db = await readDb();
  const updatedDb = db.filter((c) => c.id !== contactId);
  await writeDb(updatedDb);
};

const addContact = async body => {
   const id = nanoid();
   const contact = {id, ...body };
   const db = await readDb();
   db.push(contact);
   await writeDb(db);
   return contact;
};

const updateContact = async (contactId, body) => {
  const db = await readDb();
  const idx = db.findIndex(c => c.id === contactId);
  if (idx === -1) {
    return null
  }
  db[idx] = { ...body, contactId };
  await writeDb(db);
  return db[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
