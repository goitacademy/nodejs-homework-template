const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const dbPath = path.resolve(__dirname, "./contacts.json");

async function readDb() {
  const dbRow = await fs.readFile(dbPath);
  const db = JSON.parse(dbRow);
  return db;
}
async function writeDb(db) {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
}

const listContacts = async ({ limit = 0 }) => {
  const db = await readDb();
  return db.slice(-limit);
};

const getContactById = async (contactId) => {
  const db = await readDb();
  const contact = db.find((item) => item.id === contactId);

  return contact || null;
};

const removeContact = async (contactId) => {
  const db = await readDb();
  const contacts = db.filter((item) => item.id !== contactId);
  await writeDb(contacts);
};

const addContact = async (contact) => {
  const db = await readDb();
  const id = nanoid();
  contact.id = id;
  db.push(contact);
  await writeDb(db);
  return contact;
};

const updateContact = async (contactId, body) => {
  const db = await readDb();
  const [contact] = db.filter((el) => el.id === contactId);
  contact.name = body.name;
  contact.email = body.email;
  contact.phone = body.phone;
  await writeDb(db);
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
