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

const getContactById = async (id) => {
  const db = await readDb();
  const contact = db.find((c) => c.id === id);

  return contact || null;

};

const removeContact = async (id) => {
  const db = await readDb();
  const updatedDb = db.filter((c) => c.id !== id);
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

const putContact = async (id, body) => {
  const db = await readDb();
  const updateId = db.findIndex(contact => contact.id === id);
  if (updateId === -1) {
    return null;
  };
db[updateId] = {...db[updateId], ...body};
await writeDB(db);
return db[updateId];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  putContact,
}
