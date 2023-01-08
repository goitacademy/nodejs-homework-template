const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.resolve(__dirname, "../models/contacts.json");

async function readContacts() {
  try {
    const contactRaw = await fs.readFile(contactsPath);
    const contactDb = JSON.parse(contactRaw);
    return contactDb;
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
}

async function writeContact(db) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(db, null, 2));
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
}

const listContacts = async ({ limit = 0 }) => {
  try {
    const db = await readContacts();
    return db.slice(-limit);
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
};

const getContactById = async (contactId) => {
  try {
    const db = await readContacts();
    const contact = db.find((c) => c.id === contactId);
    return contact || null;
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
};

const removeContact = async (contactId) => {
  try {
    const db = await readContacts();
    const updateDb = db.filter((contact) => contact.id !== contactId);
    await writeContact(updateDb);
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const db = await readContacts();
    const id = nanoid();
    const contact = { id, name, email, phone };
    db.push(contact);

    await writeContact(db);
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
};

const updateContact = async (id, { name, email, phone }) => {
  try {
    const db = await readContacts();
    const index = db.findIndex((contact) => contact.id === id);

    if (index === -1) {
      return null;
    }

    db[index] = { id, name, email, phone };
    await writeContact(db);
    return db[index];
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
