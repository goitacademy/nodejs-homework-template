const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  const dbRaw = await fs.readFile(contactsPath);
  const db = JSON.parse(dbRaw);
  return db;
};
const getContactById = async (contactId) => {
  const dbRaw = await fs.readFile(contactsPath);
  const db = JSON.parse(dbRaw);
  const filterDb = db.find(({ id }) => id === contactId);
  return filterDb;
};

const removeContact = async (contactId) => {
  const dbRaw = await fs.readFile(contactsPath);
  const db = JSON.parse(dbRaw);
  const index = db.findIndex((el) => el.id === contactId);
  if (index === -1) {
    return null;
  }
  const deletedContact = db[index];
  db.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(db));
  return deletedContact;
};

const addContact = async ({ name, email, phone }) => {
  const dbRaw = await fs.readFile(contactsPath);
  const db = JSON.parse(dbRaw);
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  db.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(db));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const dbRaw = await fs.readFile(contactsPath);
  const db = JSON.parse(dbRaw);

  db.forEach((contacts) => {
    if (contacts.id === contactId) {
      if (body.name) {
        contacts.name = body.name;
      }
      if (body.email) {
        contacts.email = body.email;
      }
      if (body.phone) {
        contacts.phone = body.phone;
      }
    }
  });
  const index = db.findIndex((el) => el.id === contactId);
  if (index === -1) {
    return null;
  }
  const contact = db[index];
  await fs.writeFile(contactsPath, JSON.stringify(db));
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
