const fs = require('fs/promises');
const path = require("path");
const { nanoid } = require("nanoid");

const dbPath = path.resolve(__dirname, "contacts.json");

async function readDb() {
  const dbRaw = await fs.readFile(dbPath);
  const db = JSON.parse(dbRaw);
  return db;
};

async function writeDB(db) {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
};


const listContacts = async ({limit = 0}) => {
  const db = await readDb();
  return db.slice(-limit);
};

const getContactById = async (contactId) => {
  const db = await readDb();
  const contact = db.find((c) => c.id === contactId);

  return contact || null;

};

const removeContact = async (contactId) => {
  const db = await readDb();
  const updatedDb = db.filter((c) => c.id !== contactId);
  await writeDB(updatedDb);
};

const addContact = async ({name, email, phone}) => {
  const id = nanoid();
  const contact = { id, name, email, phone};

  const db = await readDb();
  db.push(contact);

  await writeDB(db);

  return contact;
};

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
