const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid"); 

const dbPath = path.resolve(__dirname, "contacts.json");

async function readDb() {
  const dbRaw = await fs.readFile(dbPath, { encoding: "utf8" });
  const db = JSON.parse(dbRaw);
  return db;
}

async function writeDB(db) {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
}

const listContacts = async () => {
  const contacts = await readDb();
  return contacts;
}

const getContactById = async (contactId) => {
  const contacts = await readDb();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
}

const removeContact = async (contactId) => {
  const contacts = await readDb();
  const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
  return writeDB(updatedContacts);
}

const addContact = async (body) => {
  const { name, email, phone } = body;
  const id = nanoid();
  const contact = { id, name, email, phone };
  const contacts = await readDb();
  contacts.push(contact);

  return writeDB(contacts);
}

const updateContact = async (contactId, body) => {
  const contacts = await readDb();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id: contactId, ...body };
  return writeDB(contacts[index]);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
