const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "./contacts.json");

async function readDb() {
  const db = JSON.parse(await fs.readFile(contactsPath));
  return db;
}

async function writeDB(db) {
  await fs.writeFile(contactsPath, JSON.stringify(db, null, 2));
}

const listContacts = async () => {
  const db = await readDb();
  return db;
};

const getContactById = async (id) => {
  const db = await readDb();
  const contact = db.find((contact) => contact.id === id);
  console.log(contact);
  return contact || null;
};

const addContact = async ({ name, email, phone }) => {
  const db = await readDb();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  db.push(newContact);
  await writeDB(db);
  console.log(newContact);
  return newContact;
};

const removeContact = async (id) => {
  const db = await readDb();
  const index = db.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  const deletedContact = db.splice(index, 1);
  await writeDB(db);
  return deletedContact;
};

const updateContact = async (id, { name, email, phone }) => {
  const db = await readDb();
  const index = db.findIndex((contact) => contact.id === id);

  if (index === -1) {
    return null;
  }
  db[index] = { id, name, email, phone };
  await writeDB(db);
  return db[index];
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
